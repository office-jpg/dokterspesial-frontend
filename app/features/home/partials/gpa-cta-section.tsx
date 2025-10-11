import CTASection from "~/features/home/_components/cta-section";

export default function GpaCTASection() {
    return (
        <CTASection
            id="gpa-cta"
            title="Siap Upgrade Skill Pain Management Anda?"
            backgroundImage="/images/cta-background.png"
            rightImage="/images/cta/cta-1.webp"
            rightImageClassName="-right-14 bottom-0 z-20 h-[25rem] lg:flex md:hidden hidden"
            leftImage="/images/cta/cta-2.webp"
            leftImageClassName="left-6 bottom-0 z-20 h-[25rem] lg:flex md:hidden hidden"
            buttonText="Daftar Event Global Pain Academy"
            whatsappMessage="Halo, saya ingin konsultasi mengenai program Global Pain Academy (GPA). Mohon informasi lebih lanjut tentang pelatihan manajemen nyeri dan pendaftaran. Terima kasih!"
            phoneNumber="6281291501571"
            description="Bergabung dengan dokter-dokter terdepan dalam menguasai teknik intervensi nyeri klinis"
            altText="Global Pain Academy CTA Background"
            backgroundColor="bg-gpa dark:bg-gpa"
        />
    );
}
