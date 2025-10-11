import { memo } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Star } from "lucide-react";

import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader, { useSectionAnimations } from "~/components/atoms/section-header";
import { cn } from "~/lib/utils";
import { SCHEDULE_INFO_DATA, SCHEDULE_HIGHLIGHT } from "~/contents/schedule";

function ScheduleInfoSectionComponent() {
  const { sectionRef, isInView, containerVariants, itemVariants } = useSectionAnimations();

  return (
    <section 
      id="program-peningkatan-skill"
      className="bg-background relative md:py-24 py-8" 
      ref={sectionRef}
    >
      <MaxWidthWrapper>
        <SectionHeader
          badge="Program Peningkatan Skill"
          title={
            <>
              Jadwal Workshop dan
              <br />
              <span className="text-primary">Webinar</span>
            </>
          }
          subtitle="Untuk menjaga kualitas pelatihan dan kenyamanan peserta, kami menyelenggarakan event dengan ritme berikut"
        />

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
            
            <div className="relative bg-background/90 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 md:p-8 lg:p-12">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-tertiary/20 rounded-full blur-lg" />
                    <div className="relative bg-tertiary/10 p-3 md:p-4 rounded-full border border-tertiary/30">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-tertiary" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-2 md:space-y-3">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Star className="size-3 md:size-4 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      Sistem Berkualitas
                    </span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground leading-tight">
                    {SCHEDULE_HIGHLIGHT.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-xs md:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
                    {SCHEDULE_HIGHLIGHT.description}
                  </p>
                  
                  <div className="flex items-center justify-center md:justify-start gap-2 pt-1 md:pt-2">
                    <CheckCircle2 className="size-3 md:size-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">
                      Terjadwal dengan presisi untuk hasil maksimal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            {SCHEDULE_INFO_DATA.map((item, index) => {
              const IconComponent = item.icon;
              
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={cn(
                    "flex items-start justify-center",
                    index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  )}
                >
                  <div className="flex w-full max-w-sm flex-col items-center gap-4 md:gap-6 text-center px-4 sm:px-0">
                    <div className="bg-accent border-accent flex size-14 md:size-16 lg:size-20 items-center justify-center border">
                      <div className={cn("flex size-7 md:size-8 lg:size-10 items-center justify-center", item.color)}>
                        <IconComponent className="size-3.5 md:size-4 lg:size-5 text-white" />
                      </div>
                    </div>

                    <div className="space-y-3 md:space-y-4 w-full">
                      <h3 className="text-foreground text-lg md:text-xl lg:text-2xl font-semibold leading-tight">
                        {item.title}
                      </h3>

                      <div className="space-y-2 md:space-y-3 text-left">
                        {item.details.map((detail, detailIndex) => {
                          const DetailIcon = detail.icon;
                          return (
                            <div key={detailIndex} className="flex items-start gap-2 md:gap-3">
                              <DetailIcon className="size-3.5 md:size-4 text-muted-foreground mt-0.5 md:mt-1 flex-shrink-0" />
                              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                                {detail.text}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
}

export const ScheduleInfoSection = memo(ScheduleInfoSectionComponent);
