#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera la imagen Open Graph (1200×630) de COLÓN DIGITAL."""
import os
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm

OUT = os.path.dirname(os.path.abspath(__file__))
AZUL_O = HexColor("#0D1B2A"); AZUL_C = HexColor("#5FA8D3")
AMBAR = HexColor("#FFA500"); CREMA = HexColor("#FFF8F0")

W, H = 1200, 630
# reportlab trabaja en puntos; 1200x630 px → usamos página igual en pt (1200x630)
c = canvas.Canvas(os.path.join(OUT, "_og.pdf"), pagesize=(W, H))
c.setFillColor(AZUL_O); c.rect(0, 0, W, H, stroke=0, fill=1)
c.setFillColor(white); c.setFont("Helvetica-Bold", 64)
c.drawString(70, H - 180, "🛡️ COLÓN DIGITAL")
c.setFillColor(AZUL_C); c.setFont("Helvetica", 30)
c.drawString(70, H - 240, "Tu feria. Tu comunidad. Tu seguridad.")
c.setFillColor(AMBAR); c.setFont("Helvetica-Bold", 38)
c.drawString(70, H - 330, "PIENSA • VERIFICA • PROTEGE • REPORTA")
c.setFillColor(CREMA); c.setFont("Helvetica", 20)
c.drawString(70, H - 390, "Seguridad digital · prevención de fraudes · Centro de Ayuda · retos interactivos")
qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=6, border=2)
qr.add_data("https://colon.digital")
qr.make(fit=True)
qr.make_image(fill_color="black", back_color="white").save(os.path.join(OUT, "_og_qr.png"))
c.drawImage(os.path.join(OUT, "_og_qr.png"), W - 300, 90, 220, 220)
os.remove(os.path.join(OUT, "_og_qr.png"))
c.setFillColor(CREMA); c.setFont("Helvetica", 14)
c.drawRightString(W - 80, 60, "colon.digital")
c.save()
print("PDF base OG listo (a PNG con LibreOffice/poppler):")
