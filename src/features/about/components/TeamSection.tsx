import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { TEAM_DATA } from '@/data';
import { TeamMember } from '@/types';

export default function TeamSection() {
  return (
    <section id="profil-tim" className="relative py-24 bg-brand-secondary text-brand-dark overflow-hidden">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-accent tracking-widest uppercase bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            DI BALIK DAPUR PAPATONG
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark tracking-tighter mt-4 leading-none">
            Sosok di Balik Cita Rasa Istimewa Kami
          </h2>
          <p className="text-sm md:text-base text-brand-text/80 mt-4 leading-relaxed">
            Dari dedikasi Founder melestarikan tradisi Sunda, mahakarya koki legendaris, hingga pengasuh kenyamanan rombongan Anda. Kami melayani sepenuh cinta.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {TEAM_DATA.map((member: TeamMember, index: number) => {
            // Pick corresponding illustrative icons for roles
            let RoleIcon = ChefHat;
            if (member.role.includes("Owner")) RoleIcon = Award;
            else if (member.role.includes("Manager")) RoleIcon = ShieldCheck;

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative flex flex-col justify-between bg-brand-surface border border-brand-border/40 hover:border-brand-primary/40 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-350"
              >
                <div>
                  {/* Photo Section with asymmetrical clip-path */}
                  <div className="relative aspect-square overflow-hidden rounded-2xl mb-6 bg-brand-secondary/40">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Floating role badge */}
                    <div className="absolute bottom-3 left-3 bg-brand-primary px-3 py-1.5 rounded-lg text-brand-dark text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <RoleIcon className="w-3.5 h-3.5 text-brand-accent h-3.5 w-3.5" />
                      {member.role}
                    </div>
                  </div>

                  <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-dark tracking-tight">
                    {member.name}
                  </h3>
                  
                  {member.specialty && (
                    <p className="text-xs font-mono text-brand-accent mt-1 tracking-wider uppercase font-semibold">
                      Spesialis: {member.specialty}
                    </p>
                  )}

                  <p className="text-xs md:text-sm text-brand-text/80 mt-3.5 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="border-t border-brand-border/30 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-brand-text/50">
                  <span>WARUNG PAPATONG</span>
                  <span className="text-brand-accent font-bold">EST. 2018</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
