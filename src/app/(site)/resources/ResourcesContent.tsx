"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Filter, ArrowUpDown } from "lucide-react";
import { resources } from "@/data/resources";

export function ResourcesContent() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  const tags = ["All", ...Array.from(new Set(resources.flatMap(r => r.tags || [])))];

  const filteredAndSortedResources = useMemo(() => {
    let result = [...resources];
    if (selectedTag !== "All") {
      result = result.filter(r => r.tags?.includes(selectedTag));
    }
    result.sort((a, b) => {
      const parseDate = (d: string) => {
        const [day, month, year] = d.split('/');
        return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
      };
      const timeA = parseDate(a.date);
      const timeB = parseDate(b.date);
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
    return result;
  }, [selectedTag, sortOrder]);

  return (
    <div className="flex-1 ml-0 md:ml-[33.333333%] lg:ml-80 min-h-screen bg-surface p-6 md:p-12 lg:p-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-charter text-on-surface-variant mb-4">
              Resources
            </h1>
            <p className="text-lg text-on-surface/70 leading-relaxed">
              Articles, insights, and custom-built tools exploring the intersection of architecture, project management, and technology.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 xl:ml-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-on-surface/50" />
              <select 
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="bg-surface-variant border border-white/10 rounded-md px-3 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary cursor-pointer"
              >
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-on-surface/50" />
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-surface-variant border border-white/10 rounded-md px-3 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
          {filteredAndSortedResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col"
            >
              <Link href={`/resources/${resource.id}`} className="block relative overflow-hidden aspect-[4/3] bg-surface-variant z-10">
                <img 
                  src={resource.image} 
                  alt={resource.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 absolute inset-0 z-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                <div className="absolute inset-0 p-5 flex flex-col justify-end z-20 pointer-events-none">
                  <div className="flex items-center justify-between mb-3 overflow-hidden pointer-events-auto">
                    <div className="flex flex-nowrap overflow-hidden gap-2 pr-4 [mask-image:linear-gradient(to_right,black_80%,transparent_100%)]">
                      {resource.tags?.map(tag => (
                        <span key={tag} className="text-[10px] font-medium px-2.5 py-1 bg-white/20 text-white rounded-full uppercase tracking-wider whitespace-nowrap flex-shrink-0 backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-white/70 whitespace-nowrap flex-shrink-0">
                      {resource.date}
                    </span>
                  </div>
                  <h2 className="text-base font-sans font-medium text-white group-hover:text-primary transition-colors pointer-events-auto leading-[1.1]">
                    {resource.title}
                  </h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
