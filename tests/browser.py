"""Browser checks on the built page (docs/index.html) with Playwright.

  python tests/browser.py interact                      # clicks through quizzes, lab, tabs, tooltip; reports page errors
  python tests/browser.py shots 1280 light "#f-oz@2.0,[data-plates=quick]"
                                                         # element screenshots; "@t" scrubs an animation to time t
  python tests/browser.py frames "#f-prog" 0.5,1.4,2.7 prog.png ["Scramble drill"]
                                                         # contact sheet of one animation at several times (optional tab)

Setup once:  pip install playwright pillow  &&  python -m playwright install chromium
Outputs go to tests/shots/ (git-ignored). Run `npm run build` first.
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PAGE = (ROOT / 'docs' / 'index.html').as_uri()
SHOTS = ROOT / 'tests' / 'shots'
SHOTS.mkdir(exist_ok=True)


def is_noise(text):
    # Web fonts may fail to load offline; that is not a page error.
    return 'Failed to load resource' in text


def open_page(p, width=1280, height=900, dark=False):
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': width, 'height': height},
                    color_scheme='dark' if dark else 'light', reduced_motion='reduce')
    errs = []
    pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e)))
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' and not is_noise(m.text) else None)
    pg.goto(PAGE)
    pg.wait_for_timeout(600)
    pg.add_style_tag(content='.topbar{position:static!important}')
    return b, pg, errs


def scrub(pg, sel, t):
    pg.evaluate("""([s,t])=>{const r=document.querySelector(s).querySelector('input.scrub');
        if(r){r.value=t; r.dispatchEvent(new Event('input'));}}""", [sel, t])


def interact():
    with sync_playwright() as p:
        b, pg, errs = open_page(p)
        for i in range(1, 8):
            pg.click(f'#q{i} .opt >> nth=1')
        print('quiz', pg.inner_text('#q7 .score'))
        for c in ['Cover 0', 'Cover 1', 'Cover 3', 'Cover 4', 'Cover 6']:
            for r in ['Smash', 'Flood', 'Mesh', 'Four verticals', 'Dagger']:
                pg.click(f'#lab .seg button:text-is("{c}")')
                pg.click(f'#lab .seg button:text-is("{r}")')
        for t in ['Pass', 'Play-action', 'Screen', 'Gap (pull)']:
            pg.click(f'#f-lines .seg button:text-is("{t}")')
        for k in ['12', '21', '22', '13', '10']:
            pg.click(f'#f-pers .seg button:text-is("{k}")')
        pg.click('#f-prog .seg button:text-is("Scramble drill")')
        term = pg.locator('#ch-front .g').first
        term.scroll_into_view_if_needed()
        pg.wait_for_timeout(300)
        term.hover()
        pg.wait_for_timeout(200)
        print('tooltip shown', pg.evaluate("document.getElementById('tip').classList.contains('on')"))
        print('numbered chapters', pg.evaluate("document.querySelectorAll('section.chapter:not(#glossary):not(#sources)').length"))
        print('plates', pg.evaluate("document.querySelectorAll('.plate').length"))
        print('glossary entries', pg.evaluate("document.querySelectorAll('#glossary-list div').length"))
        print('undefined glossary terms', pg.evaluate("[...document.querySelectorAll('.g')].filter(e=>!GLOSS[e.dataset.g]).map(e=>e.dataset.g)"))
        print('horizontal overflow', pg.evaluate('document.documentElement.scrollWidth > innerWidth'))
        print('errors', errs[:10] or 'none')
        b.close()
        if errs:
            sys.exit(1)


def shots(width, theme, specs):
    with sync_playwright() as p:
        b, pg, errs = open_page(p, int(width), dark=(theme == 'dark'))
        print('horizontal overflow', pg.evaluate('document.documentElement.scrollWidth'), 'vs', width)
        for spec in specs.split(','):
            sel, t = spec.split('@') if '@' in spec else (spec, None)
            el = pg.query_selector(sel)
            if not el:
                print('missing', sel)
                continue
            if t is not None:
                scrub(pg, sel, t)
            el.scroll_into_view_if_needed()
            pg.wait_for_timeout(150)
            name = ''.join(ch if ch.isalnum() or ch in '-_' else '_' for ch in sel).strip('_')
            out = SHOTS / f"{name}{'_' + t if t else ''}_{theme}_{width}.png"
            el.screenshot(path=str(out))
            print('saved', out.relative_to(ROOT))
        print('errors', errs[:10] or 'none')
        b.close()


def frames(sel, times, out, tab=None):
    from PIL import Image
    with sync_playwright() as p:
        b, pg, _ = open_page(p, 1280, 1000)
        if tab:
            pg.click(f'{sel} .seg button:text-is("{tab}")')
        ims = []
        for t in times.split(','):
            scrub(pg, sel, t)
            el = pg.query_selector(sel + ' .board')
            el.scroll_into_view_if_needed()
            pg.wait_for_timeout(60)
            f = SHOTS / f'_frame_{t}.png'
            el.screenshot(path=str(f))
            ims.append(Image.open(f))
        b.close()
    w, h = ims[0].size
    cols = min(len(ims), 3)
    rows = (len(ims) + cols - 1) // cols
    sheet = Image.new('RGB', (w * cols, h * rows), 'white')
    for i, im in enumerate(ims):
        sheet.paste(im, ((i % cols) * w, (i // cols) * h))
    sheet.save(SHOTS / out)
    print('saved', (SHOTS / out).relative_to(ROOT))


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'interact'
    if cmd == 'interact':
        interact()
    elif cmd == 'shots':
        shots(sys.argv[2], sys.argv[3], sys.argv[4])
    elif cmd == 'frames':
        frames(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5] if len(sys.argv) > 5 else None)
    else:
        print(__doc__)
