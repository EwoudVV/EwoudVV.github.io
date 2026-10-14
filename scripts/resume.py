"""Regenerate the approved one-page resume. Requires ReportLab."""
from pathlib import Path
import json
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

ROOT=Path(__file__).resolve().parents[1]
r=json.loads((ROOT/'src/resume.json').read_text())
ink=colors.HexColor('#20232d');muted=colors.HexColor('#625c73');accent=colors.HexColor('#504366')
styles={
'name':ParagraphStyle('name',fontName='Helvetica-Bold',fontSize=25,leading=29,textColor=ink,spaceAfter=6),
'contact':ParagraphStyle('contact',fontName='Helvetica',fontSize=8.3,leading=11,textColor=muted,spaceAfter=11),
'body':ParagraphStyle('body',fontName='Helvetica',fontSize=9.3,leading=12.2,textColor=ink),
'section':ParagraphStyle('section',fontName='Helvetica-Bold',fontSize=9,leading=12,textColor=accent,spaceBefore=12,spaceAfter=6),
'project':ParagraphStyle('project',fontName='Helvetica-Bold',fontSize=9.6,leading=12.4,textColor=ink,spaceBefore=5,spaceAfter=3),
'bullet':ParagraphStyle('bullet',fontName='Helvetica',fontSize=9.1,leading=12,textColor=ink,leftIndent=10,firstLineIndent=-7,spaceAfter=3),
}
def p(s,style='body'):return Paragraph(s,styles[style])
contact=f"{escape(r['location'])} | <link href='mailto:{escape(r['contactEmail'])}'>{escape(r['contactEmail'])}</link><br/><link href='https://{r['github']}'>{r['github']}</link> | <link href='https://{r['website']}'>{r['website']}</link>"
story=[p(escape(r['name']),'name'),p(contact,'contact'),p(escape(r['summary']))]
story+=[p('EDUCATION','section'),p(escape(r['education']))]
story+=[p('COMMUNITY & RADIO','section')]+[p('• '+escape(t),'bullet') for t in r['community']]
story+=[p('ENGINEERING PROJECTS','section')]
for x in r['projects']:
 block=[p(f"<link href='{x['url']}'>{escape(x['name'])}</link> <font color='#625c73' size='8'>({escape(x['date'])})</font>",'project')]
 block += [p('• '+escape(t),'bullet') for t in x['bullets']]
 story += [KeepTogether(block)]
story += [p('ADDITIONAL PROJECTS','section'),p(escape(r['additional'])),p('TECHNICAL SKILLS','section'),p(escape(r['skills']))]
doc=SimpleDocTemplate(str(ROOT/'public/ewoud-resume.pdf'),pagesize=letter,leftMargin=42,rightMargin=42,topMargin=32,bottomMargin=32,title='Ewoud Van Vooren - Resume',author='Ewoud Van Vooren')
doc.build(story)
print(ROOT/'public/ewoud-resume.pdf')
