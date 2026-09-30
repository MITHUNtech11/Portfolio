import os
import pypdfium2 as pdfium

def convert_all_certificates():
    cert_dir = 'certificate'
    public_cert_dir = os.path.join('public', 'certificate')
    os.makedirs(public_cert_dir, exist_ok=True)

    mapping = {
        'JAVA ORACLE CERTIFICATE.pdf': 'JAVA_ORACLE_CERTIFICATE.png',
        'SQL-DBMS ORACLE CERTIFICATE.pdf': 'SQL_DBMS_ORACLE_CERTIFICATE.png',
        'simplilearn -agile-10071441_10196044_1775633700196.pdf': 'Agile_Certification.png',
        'Introduction To Internet Of Things.pdf': 'Introduction_To_IoT.png',
        'Privacy and Security in Online Social Media.pdf': 'Privacy_and_Security.png',
        'Software Project Management.pdf': 'Software_Project_Management.png'
    }

    for pdf_name, png_name in mapping.items():
        src_pdf = os.path.join(cert_dir, pdf_name)
        if os.path.exists(src_pdf):
            print(f"Rendering {pdf_name} -> {png_name}...")
            pdf = pdfium.PdfDocument(src_pdf)
            page = pdf[0]
            # scale=2.5 provides crisp, high-definition images ~2000x1500
            image = page.render(scale=2.5).to_pil()
            
            # Save in certificate/
            out1 = os.path.join(cert_dir, png_name)
            image.save(out1)
            
            # Save in public/certificate/
            out2 = os.path.join(public_cert_dir, png_name)
            image.save(out2)
            print(f"  [OK] Saved to {out1} and {out2} ({image.size})")

    # Also ensure existing image certificates are copied to public/certificate/
    image_certs = [
        'Kauvery-Certificate.jpg',
        'HackerRank Hackathon.png',
        'Certificate.jpeg'
    ]
    for img_name in image_certs:
        src = os.path.join(cert_dir, img_name)
        dst = os.path.join(public_cert_dir, img_name)
        if os.path.exists(src):
            with open(src, 'rb') as f_in, open(dst, 'wb') as f_out:
                f_out.write(f_in.read())
            print(f"  [OK] Copied {img_name} to {dst}")

if __name__ == '__main__':
    convert_all_certificates()
