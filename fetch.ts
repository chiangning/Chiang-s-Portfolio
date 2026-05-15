async function fetchFiles() {
  const files = [
    "src/App.tsx",
    "src/components/AISchedulerDialog.tsx",
    "src/components/gantt/DependencyLines.tsx",
    "src/components/gantt/GridPane.tsx",
    "src/components/gantt/TimelinePane.tsx",
    "src/components/tabs/Cashflow.tsx",
    "src/components/tabs/ProjectOverview.tsx",
    "src/lib/cpm.ts",
    "src/lib/utils.ts",
    "src/types.ts"
  ];
  const fs = await import('fs/promises');
  
  await fs.mkdir('temp_gantt', { recursive: true });
  await fs.mkdir('temp_gantt/src/components/gantt', { recursive: true });
  await fs.mkdir('temp_gantt/src/components/tabs', { recursive: true });
  await fs.mkdir('temp_gantt/src/lib', { recursive: true });
  
  for (const file of files) {
    const url = `https://raw.githubusercontent.com/chiangning/Gantt-Chart/main/${file}`;
    console.log("fetching", url);
    const res = await fetch(url);
    const text = await res.text();
    await fs.writeFile(`temp_gantt/${file}`, text);
  }
}
fetchFiles();
