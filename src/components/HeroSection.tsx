import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
    <>
      <div className="container">
        <div className="flex w-100">
          <div className="heroinfoleft">
            <span className="hero_sb_title" data-aos="fade-right">
              Raja Ongkir
            </span>
            <h1 className="hero_title" data-aos="fade-right">
              Aplikasi Android
            </h1>

            <div className="lead" data-aos="fade-up">
              Jangan biarkan proses pengiriman menjadi hambatan! Dengan dua
              aplikasi dari RajaOngkir, Kamu dapat cek ongkir dan lacak resi
              dengan mudah, serta kirim paket dan tangani kendala pengiriman
              secara efisien.
            </div>
            <div className="hero_btn_box" data-aos="fade-up">
              <Link
                href="/img/wira-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="wira-resume-frontend.pdf"
                className="download_cv"
              >
                Download App Now
              </Link>
            </div>
          </div>
          {/* Rightside image section */}
          <div className="heroimageright">
            <div
              className="hero_img_box"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
              <img
                src="/illustrasiandroid.png"
                style={{
                  width: 500,
                  height: 500
                }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
