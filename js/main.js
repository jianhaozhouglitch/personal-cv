// main.js — 交互：滚动动画、导航高亮、移动菜单
document.addEventListener('DOMContentLoaded',()=>{
  // 移动菜单切换
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle){
    toggle.addEventListener('click',()=>{
      links.classList.toggle('open');
    });
  }

  // 平滑滚动与导航高亮
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  navLinks.forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth',block:'start'});
      if(links.classList.contains('open')) links.classList.remove('open');
    });
  });

  const sections = document.querySelectorAll('main section');
  const observerOpts = {root:null,rootMargin:'0px',threshold:0.12};
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  },observerOpts);
  // 观察带有动画的元素
  document.querySelectorAll('.animate').forEach(el=>io.observe(el));

  // 观察当前段落以高亮导航
  const navObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const id = entry.target.id;
      const link = document.querySelector('.nav a[href="#'+id+'"]');
      if(entry.isIntersecting){
        document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    });
  }, {root:null,threshold:0.45});
  sections.forEach(s=>navObserver.observe(s));
});
