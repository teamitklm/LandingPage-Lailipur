import { assets } from './assets.js?v=2';
import { crops, sizes } from './design-data.js?v=2';

const pages = [['home', 'Home'], ['about', 'About Me'], ['classes', 'Kelas & Coaching'], ['business', 'Karya & Bisnis'], ['activities', 'Aktivitas']];
const socialNames = ['Whatsapp', 'Facebook', 'Instagram', 'Youtube', 'Tiktok'];
const socialKeys = ['imgMaskGroup', 'imgAntDesignFacebookFilled', 'imgAntDesignInstagramFilled', 'imgGroup1', 'imgIconoirTiktokSolid'];
const app = document.querySelector('#app');
const dialog = document.querySelector('#detail-dialog');
let current = 'home';
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const mobile = () => matchMedia('(max-width: 700px)').matches;
const designPage = page => mobile() ? page + '-mobile' : page;
const file = (page, key) => assets[designPage(page)]?.[key] || assets[page]?.[key];

// SVGs keep their exported intrinsic dimensions. Their wrappers scale uniformly.
function art(page, key, cls = '') {
  const src = file(page, key);
  if (!src) return '';
  const dim = sizes[src.split('/').pop()] || [1, 1];
  return `<span class="art ${cls}" aria-hidden="true" style="--ratio:${dim[0]}/${dim[1]}"><img src="${src}" alt="" width="${dim[0]}" height="${dim[1]}" data-art-width="${dim[0]}" draggable="false"></span>`;
}
function photo(page, key, alt, cls = '') {
  const src = file(page, key);
  const crop = crops[designPage(page)]?.[key] || crops[page]?.[key] || {};
  const style = Object.entries(crop).map(([key, value]) => `${key}:${value}`).join(';');
  return `<span class="photo ${cls}"><img src="${src}" alt="${esc(alt)}" style="${style}" draggable="false"></span>`;
}
function nav(bottom = false) {
  const underline = bottom ? (assets[designPage(current)].imgLine12 ? 'imgLine12' : 'imgLine13') : 'imgLine10';
  return `<nav class="${bottom ? 'bottom-nav' : 'desktop-nav'}" aria-label="${bottom ? 'Navigasi bawah' : 'Navigasi utama'}">${pages.map(([key, label]) => `<a href="#/${key}" ${key === current ? 'aria-current="page"' : ''}>${label.replace(' & ', ' &amp; ')}${key === current ? art(current,underline,'nav-underline') : ''}</a>`).join('')}</nav>`;
}
function header() {
  return `<header class="header"><a href="#/home" class="logo" aria-label="Lailipur — Home">${photo(current, 'imgLailipurWhite1', 'Lailipur')}</a>${nav()}<button class="contact-button" data-contact="Halo, saya ingin mengenal Lailipur lebih dekat." aria-label="Hubungi Lailipur melalui Whatsapp">${art(current, 'imgWhatsappIconlyPro')}<span>Whatsapp</span></button></header>`;
}
function socials(page, labels = false) {
  return `<div class="socials ${labels ? 'with-labels' : ''}">${socialNames.map((name, i) => `<button class="social" data-social="${name}" aria-label="${name} Lailipur">${art(page, socialKeys[i], `social-icon icon-${i}`)}${labels ? `<span>${name}</span>` : ''}</button>`).join('')}</div>`;
}
function flourish(page, key, cls = '') { return art(page, key, `flourish ${cls}`); }
function ribbon(page, title, cls = '') {
  const flower = Object.keys(assets[designPage(page)]).find(k => k.startsWith('imgPngwing'));
  return `<div class="ribbon ${cls}">${cls === 'wide-ribbon' ? art(page,'imgGroup451','ribbon-line left-line')+art(page,mobile()?'imgGroup451':'imgGroup450','ribbon-line right-line') : ''}<img class="flower left" src="${file(page, flower)}" alt="" aria-hidden="true"><h2>${title}</h2><img class="flower right" src="${file(page, flower)}" alt="" aria-hidden="true"></div>`;
}
function btn(label, attrs = '', cls = '') { return `<button class="pill ${cls}" ${attrs}>${label}</button>`; }
function wave(page, key, cls = '') { return art(page, key, `wave ${cls}`); }
function contours(page) {
  if (page === 'about') return `<div class="contours about-contours">${art(page, 'imgGroup460', 'contour-right')}${mobile() ? art(page, 'imgGroup477', 'contour-left')+art(page,'imgGroup460','contour-right contour-lower') : ['imgEllipse20','imgEllipse21','imgEllipse22'].map((k, i) => art(page, k, `contour-left ellipse-${i}`)).join('')}</div>`;
  return `<div class="contours">${art(page, 'imgGroup460', 'contour-right')}${art(page, mobile() ? (page === 'classes' ? 'imgGroup483' : 'imgGroup484') : 'imgGroup461', 'contour-left')}</div>`;
}

const storyCards = [
  ['Seminar & Sharing', 'Momen Miss Laili berbagi ilmu, pengalaman, dan motivasi bisnis bersama para Bunda.', 'imgRectangle337'],
  ['Coaching & Pendampingan', 'Cerita proses belajar dan pendampingan para mitra dalam mengembangkan usahanya.', 'imgRectangle338'],
  ['Behind the Business', 'Intip aktivitas Miss Laili dalam mengembangkan brand, menyiapkan produk, dan memimpin tim.', 'imgRectangle339'],
  ['Daily Inspiration', 'Cerita keseharian, pesan motivasi, dan sudut pandang Miss Laili tentang kehidupan serta bisnis.', 'imgRectangle340']
];
const programs = [
  ['Free Seminar', 'Pengenalan peluang bisnis dan langkah awal untuk Bunda yang ingin memulai usaha dari rumah.', 'imgRectangle331'],
  ['Kelas 100 Box Pertama', 'Belajar strategi penjualan, membangun konsistensi, dan mengejar target penjualan pertama.', 'imgRectangle334'],
  ['Scale Up Coaching', 'Pendampingan bagi mitra untuk mengembangkan kemampuan bisnis dan meningkatkan penjualan.', 'imgRectangle346'],
  ['Inkubasi Distributor', 'Program lanjutan untuk mitra yang ingin mengembangkan usaha menuju skala bisnis yang lebih besar.', 'imgRectangle347']
];
const activities = [
  ['Seminar & Sharing', 'Momen berbagi ilmu dan inspirasi bersama para Bunda.', 'imgRectangle331'],
  ['Coaching & Mentoring', 'Cerita pendampingan serta proses belajar bersama para mitra.', 'imgRectangle334'],
  ['Behind the Business', 'Kegiatan di balik pengembangan brand dan pengelolaan bisnis.', 'imgRectangle350'],
  ['Daily Inspiration', 'Pesan, pengalaman, dan pembelajaran dari keseharian Miss Laili.', 'imgRectangle351']
];
function featureCard(page, entry, index, action = 'program', button = 'Kenali program') {
  return `<article class="feature-card"><div class="feature-visual">${photo(page, entry[2], entry[0])}<div class="feature-copy"><h3>${entry[0]}</h3><p>${entry[1]}</p></div></div>${button ? btn(button, `data-${action}="${index}"`) : `<button class="card-open" aria-label="Lihat ${esc(entry[0])}" data-${action}="${index}"></button>`}</article>`;
}
function home() {
  const stats = [['Founder', 'Laili Brand & Layali', 'imgFluentMdl2PartyLeader'], ['Business Coach', 'Seminar, coaching, dan pemberdayaan Bunda', 'imgIcBaselineBusinessCenter'], ['1 Juta Keluarga', 'Visi keluarga berdaya dari rumah', 'imgCarbonPedestrianFamily']];
  return `<section class="home-intro" aria-label="Kenalan dengan Miss Laili"><div class="profile">${art('home', 'imgRectangle328', 'profile-paper')}${photo('home', 'imgEllipse17', 'Laili Purnamasari', 'avatar')}<h1>Laili Purnamasari</h1><p>Owner &amp; Founder Laili Brand dan Coach<br>20.000 Ibu Berkarir dari Rumah</p>${socials('home')}</div><div class="credentials">${stats.map(([title, copy, icon], i) => `<div class="credential">${art('home', mobile() ? ['imgRectangle330','imgRectangle331','imgRectangle332'][i] : 'imgRectangle330', 'credential-paper')}${art('home', icon, 'credential-icon')}<div><h2>${title}</h2><p>${copy}</p></div></div>`).join('')}</div></section>
  <section class="home-programs" aria-labelledby="programs-title">${wave('home', mobile() ? 'imgRectangle386' : 'imgRectangle372', 'program-outline top-outline')}${wave('home', mobile() ? 'imgRectangle388' : 'imgRectangle42', 'program-wave top-wave')}<div class="ornamental-title">${flourish('home','imgVector','flip')}<h2 id="programs-title">Program Pilihan untuk Bunda</h2>${flourish('home','imgVector')}</div><div class="quick-programs"><button class="quick-program" data-program="0"><span class="quick-heading">${art('home','imgGriddyIconsConferenceFilled')}<strong>Free seminar</strong></span><span>Baru mau mulai usaha?<br>Yuk, kenali peluang bisnis dan temukan langkah pertama Bunda!</span></button><button class="quick-program" data-program="1"><span class="quick-heading">${art('home','imgGroup2')}<strong>Kelas 100 Box Pertama</strong></span><span>Belajar strategi penjualan, membangun konsistensi, dan mulai mengejar target pertama.</span></button></div><a class="more" href="#/classes">Lihat selengkapnya${art('home','imgLine11')}</a>${wave('home', mobile() ? 'imgRectangle385' : 'imgRectangle334', 'program-wave bottom-wave')}${wave('home', mobile() ? 'imgRectangle386' : 'imgRectangle373', 'program-outline bottom-outline')}</section>
  <section class="home-stories">${ribbon('home','Intip Keseruan dan Cerita Miss Laili, Yuk Bunda!', 'wide-ribbon')}<div class="stories-track" tabindex="0" aria-label="Cerita Miss Laili, geser untuk melihat semua"><div class="stories-grid">${storyCards.map(([title, copy, key], i) => `<article class="story">${i ? art('home','imgLine17','story-separator') : ''}${photo('home',key,title)}<h3>${title}</h3><p>${copy}</p>${btn('Lihat selengkapnya',`data-story="${i}"`)}</article>`).join('')}</div></div></section>
  <section class="home-cta">${wave('home','imgRectangle371','cta-edge-outline')}${wave('home','imgRectangle187','cta-edge')}${flourish('home',mobile() ? 'imgVector' : 'imgVector1','flip')}<h2>Siap Bertumbuh Bersama, Bunda?</h2><p>Mulai langkah pertama Bunda bersama Lailipur.</p><a class="pill light" href="#/classes">Jelajahi Kelas</a>${flourish('home',mobile() ? 'imgVector' : 'imgVector1')}</section>`;
}
function about() {
  return `<section class="about-intro">${contours('about')}${flourish('about','imgVector','flip')}<div class="about-profile">${art('about','imgRectangle328','about-paper')}${photo('about','imgWomanInFrontOfTheKaabaPhotoroom1','Miss Laili mengenakan hijab hitam','cutout')}<div class="about-copy"><h1>Halo Bunda...</h1><h2>Kenalan Yuk dengan Miss Laili!</h2><p>Aku Laili Purnamasari, seorang founder Laili Brand, entrepreneur, dan business coach yang memiliki semangat untuk mendampingi para Bunda agar terus belajar, berkembang, dan membangun kemandirian ekonomi dari rumah.</p>${socials('about')}</div></div>${flourish('about','imgVector')}</section>
  <section class="about-journey">${ribbon('about',mobile() ? 'Intip Keseruan dan Cerita Miss Laili, Yuk Bunda!' : 'Semua Berawal dari Sebuah Impian')}<p class="section-intro">Setiap perjalanan besar dimulai dari langkah kecil,<br>keberanian mencoba, dan kemauan untuk terus belajar</p><div class="journey-photos"><button data-gallery="0" aria-label="Perbesar foto kebersamaan pertama">${photo('about','imgRectangle331','Miss Laili bersama para Bunda di butik')}</button><button data-gallery="1" aria-label="Perbesar foto kebersamaan kedua">${photo('about',mobile() ? 'imgRectangle334' : 'imgRectangle335','Miss Laili berbagi pengalaman bersama Bunda')}</button></div>${btn('Intip foto kebersamaan kita, yuk!','data-gallery="0"')}</section>
  <section class="about-belief">${wave('about',mobile() ? 'imgRectangle383' : 'imgRectangle334','belief-top')}<div class="belief-photos">${photo('about','imgRectangle368','Doa dan renungan')}${photo('about','imgRectangle367','Miss Laili berbagi ilmu')}</div><div class="belief-copy">${flourish('about',mobile() ? 'imgVector2' : 'imgVector1','flip')}<h2>Jalur Langit &amp; Jalur Bumi</h2><p>Aku percaya doa, usaha, dan tindakan nyata harus berjalan beriringan untuk mewujudkan impian.</p>${flourish('about',mobile() ? 'imgVector2' : 'imgVector1')}</div>${wave('about','imgRectangle369','belief-bottom')}</section>
  <section class="about-message">${art('about','imgRectangle377','message-background')}${flourish('about',mobile() ? 'imgVector1' : 'imgVector','flip')}<p class="eyebrow">A MESSAGE FROM MISS LAILI</p><h2>“Bunda, jangan pernah berhenti bertumbuh.”</h2><p>Setiap langkah kecil yang Bunda mulai hari ini bisa menjadi awal dari perubahan besar.</p><a class="pill" href="#/classes">Yuk, bertumbuh bersama</a></section>`;
}
function intro(page, title, subtitle = '') {
  return `<section class="page-intro ${page}-intro">${page === 'classes' ? '' : art(page,'imgRectangle329','intro-outline')}${art(page,'imgRectangle328','intro-background')}<div class="intro-copy">${page === 'classes' ? '<p class="intro-greeting">Bunda...</p>' : ''}<h1>${title}</h1><p>${subtitle}</p></div></section>`;
}
function classes() {
  return `${intro('classes','Yuk Belajar dan Naik Kelas!','Bunda, setiap impian butuh ilmu, keberanian, dan langkah nyata untuk diwujudkan. Melalui kelas dan coaching bersama Miss Laili, Bunda bisa belajar strategi bisnis, mengembangkan kemampuan, dan membangun usaha dengan lebih terarah.')}
  <section class="class-programs">${contours('classes')}${ribbon('classes','Program Pilihan untuk Bunda')}<p class="section-intro">Setiap langkah punya ruang belajarnya sendiri.<br>Pilih kelas yang sesuai dengan perjalanan Bunda.</p><div class="feature-track" tabindex="0" aria-label="Program belajar, geser untuk melihat semua"><div class="feature-grid">${programs.map((p,i)=>featureCard('classes',p,i)).join('')}</div></div></section>
  <section class="class-benefits">${wave('classes',mobile() ? 'imgRectangle383' : 'imgRectangle42','benefit-wave')}<h2>Kenapa Belajar Bersama Miss Laili?</h2><div class="benefit-grid">${[['Ilmu Praktis','imgGroup'],['Pendampingan','imgFaSolidUserFriends'],['Komunitas','imgGroup1']].map(([title,key])=>`<div>${art('classes',key)}<h3>${title}</h3></div>`).join('')}</div><p>Belajar bukan hanya tentang mendapatkan materi,<br>tetapi juga membangun keberanian untuk mulai bergerak.</p></section>
  <section class="class-cta">${art('classes','imgRectangle329','class-cta-background')}<h2>Bunda, Sudah Siap Memulai Perjalanan Baru?</h2><p>Yuk, pilih kelas yang sesuai dengan kebutuhan Bunda.<br>Tim Lailipur siap membantu memberikan informasi program.</p>${btn('Konsultasi Kelas','data-contact="Halo, saya ingin berkonsultasi tentang kelas Lailipur."','light')}</section>`;
}
const brandIntro = 'Berawal dari keinginan menghadirkan produk berkualitas dan kesempatan bertumbuh bagi lebih banyak keluarga.';
const brands = [['Laili Brand','Produk kesehatan, kecantikan, dan kebutuhan keluarga yang dirancang untuk menemani keseharian.','imgRectangle331'],['Layali','Koleksi busana muslim, sarimbit keluarga, dan mukena untuk melengkapi momen istimewa.','imgRectangle334']];
const behind = [
  ['Cerita di Balik Laili Brand', [['Proses Produksi','imgRectangle355'],['Pengembangan Produk','imgRectangle353'],['Perjalanan Tim','imgRectangle354']]],
  ['Cerita di Balik Layali', [['Proses Produksi','imgRectangle370'],['Pengembangan Koleksi','imgRectangle371'],['Garment Layali','imgRectangle372'],['Perjalanan Tim','imgRectangle373']]]
];
function business() {
  return `${intro('business','Setiap Karya Punya Cerita,<br>Setiap Langkah Punya Makna.','Bunda, yuk kenali karya, bisnis, dan perjalanan yang aku bangun dengan semangat untuk terus bertumbuh serta membawa manfaat bagi keluarga Indonesia.')}
  <section class="brand-section">${ribbon('business','Kenali Brand yang Aku Bangun')}<p class="section-intro">${brandIntro}</p><div class="brand-grid">${brands.map((b,i)=>featureCard('business',b,i,'brand',`Kenali ${b[0]}`)).join('')}</div></section>
  <section class="behind-section">${mobile() ? '' : art('business','imgRectangle352','behind-background')}${wave('business',mobile() ? 'imgRectangle385' : 'imgRectangle356','behind-wave-outline')}${wave('business',mobile() ? 'imgRectangle383' : 'imgRectangle335','behind-wave')}${behind.map(([title,items],i)=>`<div class="behind-group group-${i}">${flourish('business','imgVector','flip')}<h2>${title}</h2><div class="behind-grid count-${items.length}">${items.map(([label,key],j)=>`<button class="behind-item" data-behind="${i}:${j}">${photo('business',key,label)}<span>${label}</span></button>`).join('')}</div>${flourish('business','imgVector')}</div>`).join('')}${mobile() ? '' : wave('business','imgRectangle187','business-bottom')}</section>`;
}
function activityPage() {
  return `${intro('activities','Ada Banyak Cerita di Setiap Langkah','Bunda, yuk intip perjalanan dan aktivitas Miss Laili dalam berbagi ilmu, membangun bisnis, dan menginspirasi lebih banyak keluarga.')}
  <section class="activity-section">${contours('activities')}${ribbon('activities','Cerita &amp; Aktivitas Terbaru')}${mobile() ? `<p class="section-intro">${brandIntro}</p>` : ''}<div class="feature-track" tabindex="0" aria-label="Aktivitas Miss Laili, geser untuk melihat semua"><div class="feature-grid">${activities.map((a,i)=>featureCard('activities',a,i,'activity','')).join('')}</div></div></section>
  <section class="activity-social">${art('activities','imgRectangle378','social-outline')}${art('activities','imgRectangle377','social-background')}<h2>Yuk, Ikuti Perjalanan Miss Laili!</h2><p>Temukan cerita, inspirasi, dan aktivitas terbaru melalui media sosial Lailipur.</p>${socials('activities',true)}${mobile() ? '' : art('activities','imgRectangle379','social-bottom')}</section>`;
}

const renderers = {home, about, classes, business, activities:activityPage};
const observer = new ResizeObserver(entries => entries.forEach(({target,contentRect}) => {const img=target.querySelector('img'); if(img) img.style.transform=`scale(${contentRect.width / Number(img.dataset.artWidth)})`;}));
function render(scroll = true) {
  observer.disconnect();
  document.querySelector('.floating-nav')?.remove();
  current = location.hash.slice(2).split('?')[0] || 'home';
  if (!renderers[current]) current = 'home';
  document.title = `${pages.find(p=>p[0]===current)[1]} — Lailipur`;
  app.className = `site page-${current}`;
  app.innerHTML = `${header()}<main id="main">${renderers[current]()}</main><footer>${nav(true)}</footer>`;
  if (mobile()) {
    // Keep fixed navigation outside the site's container-query containing block.
    const floatingNav = app.querySelector('.bottom-nav');
    floatingNav.classList.add('floating-nav');
    document.body.append(floatingNav);
  }
  document.querySelectorAll('.art').forEach(el=>observer.observe(el));
  if(scroll) window.scrollTo({top:0,behavior:'instant'});
}
function openDialog(title, body) {
  document.querySelector('#dialog-content').innerHTML = `<h2 id="dialog-title">${title}</h2>${body}`;
  dialog.showModal();
  dialog.querySelectorAll('.art').forEach(el=>observer.observe(el));
}
function contact(message) {
  openDialog('Hubungi Lailipur', `<p>${esc(message)}</p><p>Nomor WhatsApp resmi belum tersedia di desain. Salin pesan ini dan kirimkan melalui kontak resmi Lailipur yang Bunda miliki.</p><button class="pill" data-copy="${esc(message)}">Salin pesan</button><p class="copy-status" role="status"></p>`);
}
document.addEventListener('click', async event => {
  const button=event.target.closest('button'); if(!button) return;
  if(button.matches('.dialog-close')) return dialog.close();
  const d=button.dataset;
  if(d.contact) return contact(d.contact);
  if(d.copy) {try{await navigator.clipboard.writeText(d.copy);dialog.querySelector('.copy-status').textContent='Pesan disalin.';}catch{dialog.querySelector('.copy-status').textContent=d.copy;}return;}
  if(d.social) return openDialog(`${d.social} Lailipur`, `<p>Tautan ${esc(d.social)} resmi belum dicantumkan di desain. Gunakan akun resmi Lailipur yang sudah Bunda kenal.</p>`);
  if(d.program !== undefined) {const p=programs[+d.program];return openDialog(p[0],`${photo('classes',p[2],p[0],'dialog-photo')}<p>${p[1]}</p>${btn('Tanyakan program ini',`data-contact="Halo, saya ingin tahu lebih lanjut tentang ${p[0]}."`)}`);}
  if(d.story !== undefined) {const p=storyCards[+d.story];return openDialog(p[0],`${photo('home',p[2],p[0],'dialog-photo')}<p>${p[1]}</p><a class="pill" href="#/activities" data-close>Lihat aktivitas Miss Laili</a>`);}
  if(d.activity !== undefined) {const p=activities[+d.activity];return openDialog(p[0],`${photo('activities',p[2],p[0],'dialog-photo')}<p>${p[1]}</p>`);}
  if(d.brand !== undefined) {const p=brands[+d.brand];return openDialog(p[0],`${photo('business',p[2],p[0],'dialog-photo')}<p>${p[1]}</p>${btn(`Tanyakan ${p[0]}`,`data-contact="Halo, saya ingin mengenal ${p[0]} lebih dekat."`)}`);}
  if(d.gallery !== undefined) {const i=+d.gallery;const key=i===0?'imgRectangle331':(mobile()?'imgRectangle334':'imgRectangle335');return openDialog('Kebersamaan bersama Bunda',`${photo('about',key,'Kebersamaan Miss Laili dan para Bunda','dialog-photo')}<div class="gallery-controls">${btn('Foto sebelumnya',`data-gallery="${1-i}"`)}${btn('Foto berikutnya',`data-gallery="${1-i}"`)}</div>`);}
  if(d.behind) {const [i,j]=d.behind.split(':').map(Number), p=behind[i][1][j];return openDialog(p[0],`${photo('business',p[1],p[0],'dialog-photo')}<p>${behind[i][0]}</p>`);}
});
dialog.addEventListener('click', e=>{if(e.target===dialog)dialog.close();});
window.addEventListener('hashchange',()=>{if(!location.hash.startsWith('#/'))return;dialog.close();render();});
matchMedia('(max-width:700px)').addEventListener('change',()=>render(false));
render();
