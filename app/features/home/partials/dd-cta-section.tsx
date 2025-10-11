import CTASection from "~/features/home/_components/cta-section";

export default function DdCTASection() {
    return (
        <CTASection
            id="dd-cta"
            title="Siap Menjadi Dentist yang Lebih Smart?"
            backgroundImage="/images/cta-background.png"
            rightImage="/images/cta/cta-4.webp"
            rightImageClassName="right-20 bottom-0 z-20 h-[27rem] lg:flex md:hidden hidden"
            leftImage="/images/cta/cta-3.webp"
            leftImageClassName="left-10 bottom-0 z-20 h-[26rem] lg:flex md:hidden hidden"
            buttonText="Daftar Event Dokter Dentist"
            whatsappMessage="Halo, saya ingin konsultasi mengenai program Dokter Dentist (DD). Mohon informasi lebih lanjut tentang pelatihan kedokteran gigi dan pendaftaran. Terima kasih!"
            phoneNumber="6285704666911"
            description="Bergabung dengan dokter gigi terdepan dalam menguasai keterampilan kedokteran gigi modern"
            altText="Dokter Dentist CTA Background"
            backgroundColor="bg-dd dark:bg-dd"
        />
    );
}
