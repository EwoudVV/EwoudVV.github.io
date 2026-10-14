"""Regenerate the one-page resume: python3 scripts/resume.py (requires reportlab)."""
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'src/resume.json').read_text())
ink = colors.HexColor('#20232d')
muted = colors.HexColor('#625c73')
accent = colors.HexColor('#504366')
styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=27, leading=30, textColor=ink, spaceAfter=4),
    'heading': ParagraphStyle('heading', fontName='Helvetica', fontSize=11, leading=14, textColor=accent, spaceAfter=7),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=8, leading=11, textColor=muted, spaceAfter=12),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=8.8, leading=12, textColor=ink),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=accent, spaceBefore=12, spaceAfter=6),
    'project': ParagraphStyle('project', fontName='Helvetica-Bold', fontSize=9.1, leading=12, textColor=ink, spaceBefore=5),
    'status': ParagraphStyle('status', fontName='Helvetica', fontSize=7.8, leading=11, textColor=muted, spaceAfter=3),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=ink, leftIndent=9, firstLineIndent=-7, spaceAfter=2)
}
def p(text, style='body'):
    return Paragraph(text, styles[style])

story = [p(data['name'],'name'), p(data['heading'],'heading')]
contact = f"{data['location']} · <link href='https://{data['github']}'>{data['github']}</link> · <link href='https://{data['website']}'>{data['website']}</link>"
# Replace the visible TODO in src/resume.json when a public email is provided.
if data['contactEmail'] and not data['contactEmail'].startswith('TODO:'):
    contact += f" · <link href='mailto:{escape(data['contactEmail'])}'>{escape(data['contactEmail'])}</link>"
story += [p(contact,'contact'),p(escape(data['summary']))]
story += [p('EDUCATION','section'),p(f"<b>{escape(data['education']['school'])}</b>"),p(escape(data['education']['detail']))]
story += [p('ENGINEERING PROJECTS','section')]
for project in data['projects']:
    block=[p(f"<link href='{project['url']}'>{escape(project['name'])}</link>",'project'),p(escape(project['status']),'status')]
    block += [p('• '+escape(b),'bullet') for b in project['bullets']]
    story += [KeepTogether(block)]
story += [p('TECHNICAL SKILLS','section'),p(escape(data['skills'])),p('COMMUNITY','section'),p(escape(data['activities']))]
doc=SimpleDocTemplate(str(ROOT/'public/ewoud-resume.pdf'),pagesize=letter,rightMargin=43,leftMargin=43,topMargin=34,bottomMargin=32,title='Ewoud | Electronics & PCB design',author='Ewoud',subject='Electronics engineering internship resume')
doc.build(story)
print('Generated public/ewoud-resume.pdf')
