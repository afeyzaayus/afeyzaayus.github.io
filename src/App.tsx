import { useState, useEffect, type CSSProperties } from 'react'

const translations = {
  en: {
    nav: {
      about: 'About',
      work: 'Work',
      skills: 'Skills',
      organizations: 'Organizations',
      writing: 'Writing',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hello, I\'m',
      name: 'Ayşe Feyza Serbest',
      role: 'Computer Engineering Student',
      tagline: 'I build backend systems and autonomous robotics software — from UAV image processing to swarm simulation.',
      cta: 'Projects',
      ctaSecondary: 'Get in Touch',
      cvLabel: 'Download CV',
      quote: 'Code is just another language for solving real-world problems.',
    },
    about: {
      label: 'About',
      heading: 'Systems, software,\nand autonomy.',
      body: 'I\'m a fourth-year Computer Engineering student at Gebze Technical University, working at the intersection of systems programming, backend development, and applied engineering. I\'ve spent the last two years building UAV software, OCR-based systems, and mathematical models. This term, I\'m taking Introduction to Digital Integrated Circuits, Symbolic Computation, and Object Oriented Analysis and Design.',
      body2: 'I\'m currently a Candidate Engineer at TUSMEC, working on swarm robotics simulation and digital twins, and I contribute to the TEKNOFEST UAV Competition as part of the software team. I\'m passionate about AI and always looking for the next hard problem to solve. I believe in keeping only what\'s essential, and cutting out everything else. Outside of work, I like going for walks, attending concerts, learning to play electric guitar, and volunteering with LÖSEV (Foundation for Children with Leukemia) on social responsibility initiatives.',
      available: 'Open to opportunities',
    },
    work: {
      label: 'Selected Work',
      heading: 'Projects',
      viewOnGithub: 'View on GitHub',
      projects: [
        {
          year: '2026',
          title: 'Predictive APF — Swarm Simulation Engine',
          role: 'TUSMEC Internship Project',
          desc: 'A heterogeneous swarm simulation engine built in Python that simulates six agent types at once — UAV, UGV, AMR, USV, UUV, and rockets. I extended the classic Artificial Potential Field (APF) method into PAPF (Predictive APF), which looks ahead along an agent\'s direction of motion to avoid collisions earlier, reaching a 3–5x larger safety margin than classic APF in testing. Built with NumPy, Pygame, and an optional ROS 2 / RViz bridge, with 99% test coverage.',
          tags: ['Python', 'Pygame', 'NumPy', 'ROS 2'],
          image: '/papf-simulation.png',
          url: 'https://github.com/afeyzaayus/Predictional-Artificial-Potential-Field',
        },
        {
          year: '2026',
          title: 'Swarm ROI Dashboard',
          role: 'TUSMEC Internship Project',
          desc: 'A Django-based demo console I built on top of the simulation engine to show in demo meetings with companies. The first page serves the swarm simulation through an API and visualizes it live in the browser, with obstacles you can drag around mid-run; the second page is an ROI calculator that computes monthly savings, payback period, and 5-year ROI, with a Chart.js comparison graph and PDF report export. Built during my TUSMEC internship as a companion to the Predictive APF project.',
          tags: ['Django', 'REST API', 'Chart.js', 'ReportLab'],
          image: '',
          url: 'https://github.com/afeyzaayus/swarm-roi-dashboard',
        },
        {
          year: '2026',
          title: 'Systems Programming — CSE344',
          role: 'GTU Course Projects',
          desc: 'Seven projects — six assignments and a final — from Gebze Technical University\'s CSE344 Systems Programming course, written in C on Linux/UNIX with POSIX standards. Through them I applied low-level file I/O, processes and signals, pipes and FIFOs, POSIX threads with mutexes, condition variables and semaphores, TCP/UDP sockets, message queues, and I/O multiplexing with select, poll and epoll. The final project combines it all into a multithreaded, thread-pool-based network server with graceful shutdown and deadlock avoidance under heavy concurrent load.',
          tags: ['C', 'POSIX Threads', 'Sockets', 'IPC', 'Linux'],
          image: '',
          url: 'https://github.com/afeyzaayus/GTU-CSE344-Systems-Programming',
        },
        {
          year: '2026',
          title: 'AlchemyLang — Custom Programming Language',
          role: 'GTU CSE341 Course Project',
          desc: 'A domain-specific language themed around alchemy that I designed and implemented for the CSE341 Programming Languages course: you declare substances, write recipes that transform them, and simulate the results. Its purpose was to put programming language theory into practice. Built in Python with no third-party dependencies, in two parts — first a hand-written lexer, recursive-descent parser and AST with syntax error reporting, then a static type checker and a tree-walking interpreter with runtime error handling. Building AlchemyLang gave me a first-hand understanding of how a language works under the hood, from turning source text into tokens and a syntax tree to type-checking and executing it.',
          tags: ['Python', 'Lexer', 'Parser', 'Type Checker', 'Interpreter'],
          image: '',
          url: 'https://github.com/afeyzaayus/CSE341-Programming-Languages',
        },
        {
          year: '2026',
          title: 'Autonomous Fire-Suppression Rover',
          role: 'Developer & Systems Integrator',
          desc: 'A team project for the CSE 396 Computer Engineering Project course: an autonomous rover that detects fire, orients itself toward it, and triggers a suppression mechanism once it is within a defined range — combining image processing with hardware control in a single system. As developer and systems integrator, I performed fire detection on the live camera feed with a YOLO model and developed basic targeting and orientation logic based on the target\'s position in the frame, established reliable serial communication between the Raspberry Pi and Arduino to transmit movement commands, and built a simple digital twin interface to track and visualize the rover\'s movements in real time.',
          tags: ['YOLO', 'Raspberry Pi', 'Arduino', 'C/C++', 'Python', 'Image Processing', 'Serial Communication', 'Digital Twin'],
          image: '/rover.jpg',
          url: 'https://github.com/mishima2077/cse-396-group2',
        },
        {
          year: '2026',
          title: 'Red-Black Tree — Step-by-Step Visualizer',
          role: 'Educational Visualization Tool',
          desc: 'An interactive Java Swing tool I built to make Red-Black Tree insertion easy to understand. Instead of showing only the final tree, it records every operation — BST placement, recoloring, and rotations — so you can step backward and forward through each one, with plain-English explanations of which rule and which fix-up case (uncle red, elbow, or straight line) is being applied. Colored rings mark the current node, the uncle, and the grandparent, making each case visible at a glance.',
          tags: ['Java', 'Swing', 'Data Structures', 'Visualization'],
          image: '/red-black-tree.png',
          url: 'https://github.com/afeyzaayus/Red-Black-Tree-Visualization',
        },
        {
          year: '2025',
          title: 'Dining Philosophers — Threads & Mutexes',
          role: '42 Project',
          desc: 'A 42 project in C — my take on the classic Dining Philosophers problem: each philosopher runs as its own POSIX thread, with a separate observer thread watching for deaths and completion. I protected every fork and all shared state — meal timestamps, the stop flag, and log output — with mutexes to eliminate race conditions, and used an alternating fork pick-up order plus staggered starts to avoid deadlock. The program prints a millisecond-timestamped log of every action and handles edge cases like a single philosopher.',
          tags: ['C', 'POSIX Threads', 'Mutex', 'Race Conditions'],
          image: '/philosophers.jpg',
          url: 'https://github.com/afeyzaayus/philosophers',
        },
        {
          year: '2025',
          title: 'minishell — A Bash-like Shell in C',
          role: '42 Team Project',
          desc: 'A 42 team project: a Bash-like shell in C, built by two people, supporting pipes, redirections, heredocs, environment variables, builtins, and signal handling. I built the executor, the part that turns a parsed command line into running processes. It runs single commands and full pipelines using fork, pipe, dup2, and close to create processes and wire up their input and output, resolves programs through PATH with access and stat, launches them with execve, and collects results with waitpid to produce shell-style exit codes (126, 127, and 128+signal). Single builtins like cd run in the parent process so they can change the shell itself.',
          tags: ['C', 'fork', 'pipe', 'dup2', 'execve', 'waitpid'],
          image: '',
          url: 'https://github.com/tolgauzan/minishell',
        },
        {
          year: '2025',
          title: 'push_swap — Sorting with Two Stacks',
          role: '42 Project',
          desc: 'A 42 project in C: sort a list of integers using only two stacks and a small set of stack operations (swap, push, rotate, reverse rotate) in as few moves as possible. Both stacks are implemented as linked lists. Up to 70 numbers, it repeatedly rotates the smallest value to the top and pushes it to stack B, sorts the last three, then pushes everything back; above 70, it assigns each number a rank and runs a bitwise radix sort. Input validation rejects invalid formats, out-of-range integers, and duplicates.',
          tags: ['C', 'Linked List', 'Radix Sort', 'Algorithms'],
          image: '',
          url: 'https://github.com/afeyzaayus/push_swap',
        },
        {
          year: '2025',
          title: 'fract-ol — Mandelbrot & Julia Fractals',
          role: '42 Project',
          desc: 'A 42 project in C that renders the Mandelbrot and Julia fractals interactively with MiniLibX. Both sets use the same escape-time algorithm — iterating z² + c and coloring each pixel by how quickly it escapes — with the Julia constant passed as command-line arguments. Pixels are written straight into an image buffer, the mouse wheel zooms in and out around the cursor, and the arrow keys pan the view.',
          tags: ['C', 'MiniLibX', 'Fractals', 'Computer Graphics'],
          image: '/fract-ol.jpg',
          url: 'https://github.com/afeyzaayus/fract-ol',
        },
        {
          year: '2025',
          title: 'Site Management System',
          role: 'Backend Developer & Product Manager',
          desc: 'A team project for the CSE343 Software Engineering course: a site management system with a web panel for administrators and a mobile app for residents. Administrators use the web panel to publish announcements, record dues payments manually, and enter residents\' information; residents use the mobile app to read announcements and submit complaints and suggestions. The backend is built with Node.js (Express.js) on a Supabase PostgreSQL database, the web panel with HTML, CSS, and JavaScript, and the mobile app with Flutter. As Product Manager I led product planning and requirement analysis, and as backend developer I built the server side, tracking tasks and workflows in Jira.',
          tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'Flutter', 'HTML/CSS/JS', 'Product Management', 'Jira'],
          image: '',
          url: 'https://github.com/afeyzaayus/Site-Management-System',
        },
      ],
    },
    skills: {
      label: 'Capabilities',
      heading: 'What I bring\nto a project',
      categories: [
        {
          name: 'Software Engineering',
          items: ['Algorithm Design', 'Mathematical Modeling & Simulation', 'System Design Basics'],
        },
        {
          name: 'Programming & Frameworks',
          items: ['C', 'C++', 'Java', 'Node.js', 'Python', 'Django', 'SQL'],
        },
        {
          name: 'Simulation & Game',
          items: ['Gazebo', 'Unity', 'Pygame'],
        },
        {
          name: 'Systems & Networking',
          items: ['Linux / Unix', 'Operating Systems Concepts', 'Networking Fundamentals'],
        },
        {
          name: 'Robotics & Autonomous Systems',
          items: ['ROS 2', 'ArduPilot', 'Mission Planner', 'MAVLink', 'Mapping & Localization', 'Path Planning'],
        },
        {
          name: 'Tools & Collaboration',
          items: ['Git', 'GitHub', 'Docker', 'Postman', 'Jira', 'Agile / Scrum', 'Team Collaboration', 'Technical Documentation'],
        },
      ],
    },
    organizations: {
      label: 'Organizations',
      heading: 'Competitions\n& community',
      items: [
        {
          date: '2024 –',
          title: 'TEKNOFEST 2026 International UAV Competition',
          role: 'GTU Kuzgun Team — Fixed Wing, Software Team Member',
          desc: 'Software team member for GTU Kuzgun\'s Fixed Wing category since 2024. Our team placed 4th in the world at TEKNOFEST 2026.',
        },
        {
          date: 'Dec 2025',
          title: 'Emlak Konut Smart Site Management Ideathon',
          role: 'Team Lead',
          desc: 'Led the team at this two-day ideathon (Dec 6–7, 2025), developing an API concept that adds secure in-site communication to existing site management applications.',
        },
        {
          date: 'Apr 2026',
          title: 'ASELSAN Guidance Systems Speed Bootcamp',
          role: 'Participant',
          desc: 'Heard industry professionals speak about guidance systems on April 11, 2026, and got to see some of the hardware in person.',
        },
        {
          date: 'Jun 2026',
          title: 'Çözüm Sende 2026',
          role: 'Hackathon',
          desc: 'Built a solution that detects earthquake-damaged buildings and blocked roads from UAV imagery, then calculates the shortest route to a target using Dijkstra\'s algorithm. Our team placed 5th.',
        },
      ],
    },
    writing: {
      label: 'Writing',
      heading: 'Technical writing\n& articles',
      mediumCta: 'Follow on Medium',
      empty: 'Send me the links to your Huawei Student Developers articles and I\'ll add each one here as a card, in this exact layout.',
      readOn: 'Read on Medium',
    },
    contact: {
      label: 'Contact',
      heading: 'Let\'s build\nsomething together.',
      body: 'I\'m currently open to internships, collaborations, and interesting problems. If you have something in mind, I\'d love to hear from you.',
      email: 'aysefeyzaserbest@gmail.com',
      emailLabel: 'Send an email',
      links: [
        { label: 'LinkedIn', href: 'https://linkedin.com/in/ayşe-feyza-serbest-837716253/' },
        { label: 'GitHub', href: 'https://github.com/afeyzaayus' },
        { label: 'Medium', href: 'https://medium.com/@aysefeyzaserbest' },
      ],
    },
    footer: {
      copy: 'Ayşe Feyza Serbest. Built with intention.',
    },
  },
  tr: {
    nav: {
      about: 'Hakkımda',
      work: 'İşler',
      skills: 'Yetenekler',
      organizations: 'Organizasyonlar',
      writing: 'Yazılar',
      contact: 'İletişim',
    },
    hero: {
      greeting: 'Merhaba, ben',
      name: 'Ayşe Feyza Serbest',
      role: 'Bilgisayar Mühendisliği Öğrencisi',
      tagline: 'UAV görüntü işlemeden sürü robotik simülasyonlarına kadar, arka uç sistemleri ve otonom robotik yazılımları geliştiriyorum.',
      cta: 'Projeler',
      ctaSecondary: 'İletişime Geç',
      cvLabel: 'CV İndir',
      quote: 'Kod, gerçek dünya problemlerini çözmenin bir başka dilidir.',
    },
    about: {
      label: 'Hakkımda',
      heading: 'Sistemler, yazılım\nve otonomi.',
      body: 'Gebze Teknik Üniversitesi\'nde dördüncü sınıf Bilgisayar Mühendisliği öğrencisiyim; sistem programlama, arka uç geliştirme ve uygulamalı mühendisliğin kesiştiği noktada çalışıyorum. Son iki yıldır İHA yazılımları, OCR tabanlı sistemler ve matematiksel modeller üzerinde çalışıyorum. Bu dönem Introduction to Digital Integrated Circuits, Symbolic Computation ve Object Oriented Analysis and Design derslerini alıyorum.',
      body2: 'Şu anda TUSMEC\'te sürü robotiği simülasyonu ve dijital ikizler üzerinde çalışan bir Aday Mühendis\'im, ayrıca TEKNOFEST İHA Yarışması\'nda yazılım takımı üyesi olarak yer alıyorum. Yapay zekaya tutkuyla bağlıyım ve her zaman çözülecek yeni bir problem arıyorum. Sadece gerekli olanı bırakmaya, gereksiz her şeyi çıkarmaya inanıyorum. İş dışında yürüyüş yapıyor, konserlere gidiyor, elektrogitar öğrenmeye çalışıyor ve LÖSEV gönüllüsü olarak sosyal sorumluluk projelerinde yer alıyorum.',
      available: 'Fırsatlara açığım',
    },
    work: {
      label: 'Seçili İşler',
      heading: 'Projeler',
      viewOnGithub: "GitHub'da Görüntüle",
      projects: [
        {
          year: '2026',
          title: 'Predictive APF — Sürü Simülasyon Motoru',
          role: 'TUSMEC Stajı Projesi',
          desc: 'Python ile geliştirdiğim, İHA, İKA, AMR, USV, UUV ve roket olmak üzere altı farklı ajan tipini aynı anda simüle eden heterojen bir sürü simülasyon motoru. Klasik Artificial Potential Field (APF) yöntemini, hareket yönünde ileriye bakan bir tahmin noktası kullanarak çarpışmadan önce erken kaçınma sağlayan PAPF (Predictive APF) ile geliştirdim; testlerde klasik APF\'ye göre 3–5 kat daha geniş güvenlik marjı elde ettim. NumPy, Pygame ve isteğe bağlı ROS 2 / RViz entegrasyonuyla geliştirdim, %99 test kapsamına sahip.',
          tags: ['Python', 'Pygame', 'NumPy', 'ROS 2'],
          image: '/papf-simulation.png',
          url: 'https://github.com/afeyzaayus/Predictional-Artificial-Potential-Field',
        },
        {
          year: '2026',
          title: 'Swarm ROI Dashboard',
          role: 'TUSMEC Stajı Projesi',
          desc: 'Şirketlerle yapılan demo toplantılarında göstermek için simülasyon motorunun üzerine inşa ettiğim Django tabanlı bir demo konsolu. İlk sayfa, sürü simülasyonunu bir API üzerinden sunup tarayıcıda canlı olarak görselleştiriyor ve simülasyon çalışırken engelleri sürükleyip taşımaya izin veriyor; ikinci sayfa ise aylık tasarruf, geri ödeme süresi ve 5 yıllık ROI\'yi hesaplayan, Chart.js karşılaştırma grafiği ve PDF rapor çıktısı sunan bir ROI hesaplayıcısı. Predictive APF projesiyle bağlantılı olarak TUSMEC stajım sırasında geliştirdim.',
          tags: ['Django', 'REST API', 'Chart.js', 'ReportLab'],
          image: '',
          url: 'https://github.com/afeyzaayus/swarm-roi-dashboard',
        },
        {
          year: '2026',
          title: 'Sistem Programlama — CSE344',
          role: 'GTU Ders Projeleri',
          desc: 'Gebze Teknik Üniversitesi CSE344 Sistem Programlama dersi kapsamında, Linux/UNIX ortamında POSIX standartlarıyla C dilinde geliştirdiğim yedi proje (altı ödev ve bir final projesi). Bu projeler sayesinde düşük seviyeli dosya I/O, süreç yönetimi ve sinyaller, pipe ve FIFO\'lar, mutex, koşul değişkeni ve semafor ile POSIX thread\'ler, TCP/UDP socket\'ler, mesaj kuyrukları ile select, poll ve epoll tabanlı I/O çoğullamayı uyguladım. Final projesinde tüm bu kavramları, thread-pool mimarili, düzgün kapanabilen ve yoğun eşzamanlı yük altında kilitlenmeyi önleyen çok iş parçacıklı bir ağ sunucusunda birleştirdim.',
          tags: ['C', 'POSIX Threads', 'Sockets', 'IPC', 'Linux'],
          image: '',
          url: 'https://github.com/afeyzaayus/GTU-CSE344-Systems-Programming',
        },
        {
          year: '2026',
          title: 'AlchemyLang — Kendi Programlama Dilim',
          role: 'GTU CSE341 Ders Projesi',
          desc: 'CSE341 Programlama Dilleri dersi için tasarlayıp geliştirdiğim, simya temalı alana özel bir programlama dili (DSL): maddeler tanımlanıyor, bunları dönüştüren tarifler yazılıyor ve sonuçlar simüle ediliyor. Amacı, programlama dili teorisini pratikte uygulamaktı. Python ile, harici bağımlılık olmadan ve iki aşamada geliştirdim — önce sözdizimi hatası raporlamalı, kendi yazdığım bir lexer, recursive-descent parser ve AST; ardından statik tip denetleyicisi ile çalışma zamanı hata yönetimine sahip bir tree-walking yorumlayıcı. AlchemyLang, bir dilin arka planda nasıl çalıştığını — kaynak metnin token\'lara ve sözdizimi ağacına dönüşmesinden tip denetimine ve çalıştırılmasına kadar — uygulamalı olarak öğrenmemi sağladı.',
          tags: ['Python', 'Lexer', 'Parser', 'Type Checker', 'Interpreter'],
          image: '',
          url: 'https://github.com/afeyzaayus/CSE341-Programming-Languages',
        },
        {
          year: '2026',
          title: 'Otonom Yangın Söndürme Robotu',
          role: 'Geliştirici & Sistem Entegratörü',
          desc: 'CSE 396 Bilgisayar Mühendisliği Projesi dersi kapsamında ekip olarak geliştirdiğimiz otonom bir araç: yangını tespit ediyor, ona doğru yöneliyor ve belirlenen menzile girdiğinde söndürme mekanizmasını tetikliyor; görüntü işleme ile donanım kontrolünü tek bir sistemde birleştiriyor. Geliştirici ve sistem entegratörü olarak canlı kamera görüntüsünde YOLO modeliyle yangın tespiti yaptım, hedefin kadraj içindeki konumuna göre temel hedefleme ve yönelme mantığını geliştirdim, hareket komutlarını güvenilir biçimde iletmek için Raspberry Pi ile Arduino arasında seri haberleşme kurdum ve aracın hareketlerini gerçek zamanlı izleyip görselleştiren basit bir dijital ikiz arayüzü geliştirdim.',
          tags: ['YOLO', 'Raspberry Pi', 'Arduino', 'C/C++', 'Python', 'Image Processing', 'Serial Communication', 'Digital Twin'],
          image: '/rover.jpg',
          url: 'https://github.com/mishima2077/cse-396-group2',
        },
        {
          year: '2026',
          title: 'Red-Black Tree — Adım Adım Görselleştirici',
          role: 'Eğitim Amaçlı Görselleştirme Aracı',
          desc: 'Red-Black Tree\'nin ekleme sırasında dengesini nasıl koruduğunu anlaşılır kılmak için Java Swing ile geliştirdiğim etkileşimli bir görselleştirme aracı. Yalnızca son ağacı göstermek yerine her işlemi — BST\'ye yerleştirme, yeniden renklendirme ve rotasyonlar — kaydediyor; böylece adımlar arasında ileri geri gidilebiliyor ve her adımda hangi kuralın, hangi düzeltme durumunun (uncle kırmızı, elbow ya da düz çizgi) uygulandığı sade bir dille açıklanıyor. Mevcut düğümü, uncle\'ı ve grandparent\'ı işaretleyen renkli halkalar her durumu bir bakışta görünür kılıyor.',
          tags: ['Java', 'Swing', 'Data Structures', 'Visualization'],
          image: '/red-black-tree.png',
          url: 'https://github.com/afeyzaayus/Red-Black-Tree-Visualization',
        },
        {
          year: '2025',
          title: 'Dining Philosophers — Thread ve Mutex',
          role: '42 Projesi',
          desc: '42 kapsamında C ile çözdüğüm klasik Dining Philosophers (yemek yiyen filozoflar) problemi: her filozof kendi POSIX thread\'inde çalışıyor, ayrıca ölümleri ve tamamlanmayı izleyen ayrı bir gözlemci thread\'i var. Race condition\'ları önlemek için her çatalı ve tüm paylaşılan durumu — yemek zamanları, durdurma bayrağı ve log çıktısı — mutex\'lerle korudum; deadlock\'u önlemek için ise dönüşümlü çatal alma sırası ve kademeli başlangıç kullandım. Program her eylemi milisaniye zaman damgasıyla logluyor ve tek filozof gibi uç durumları da ele alıyor.',
          tags: ['C', 'POSIX Threads', 'Mutex', 'Race Conditions'],
          image: '/philosophers.jpg',
          url: 'https://github.com/afeyzaayus/philosophers',
        },
        {
          year: '2025',
          title: 'minishell — C ile Bash Benzeri Shell',
          role: '42 Takım Projesi',
          desc: '42 kapsamında iki kişilik ekiple C ile geliştirdiğimiz; pipe, yönlendirme (redirection), heredoc, ortam değişkenleri, builtin komutlar ve sinyal yönetimini destekleyen Bash benzeri bir shell. Ben, ayrıştırılmış komut satırını çalışan süreçlere çeviren executor kısmını geliştirdim. Tekil komutları ve pipeline\'ları çalıştırırken süreç oluşturup giriş/çıkışlarını bağlamak için fork, pipe, dup2 ve close; programları PATH üzerinden bulmak için access ve stat; çalıştırmak için execve; sonuçları toplayıp shell tarzı çıkış kodlarına (126, 127 ve 128+sinyal) çevirmek için waitpid kullandım. Tekil builtin komutlar (cd gibi) shell\'in kendisini değiştirebilsin diye ana süreçte çalışıyor.',
          tags: ['C', 'fork', 'pipe', 'dup2', 'execve', 'waitpid'],
          image: '',
          url: 'https://github.com/tolgauzan/minishell',
        },
        {
          year: '2025',
          title: 'push_swap — İki Stack ile Sıralama',
          role: '42 Projesi',
          desc: '42 kapsamında C ile geliştirdiğim proje: bir sayı listesini yalnızca iki stack ve sınırlı sayıda stack işlemi (swap, push, rotate, reverse rotate) kullanarak mümkün olan en az hamleyle sıralıyorum. İki stack de linked list ile gerçekleştirildi. 70 sayıya kadar, en küçük değeri en kısa yönden üste döndürüp B stack\'ine atıyor, son üç elemanı sıraladıktan sonra hepsini geri alıyorum; 70\'ten büyük girdilerde her sayıya bir sıra numarası (tag) atayıp bitwise radix sort uyguluyorum. Girdi doğrulaması geçersiz formatları, aralık dışı tamsayıları ve tekrar eden sayıları reddediyor.',
          tags: ['C', 'Linked List', 'Radix Sort', 'Algorithms'],
          image: '',
          url: 'https://github.com/afeyzaayus/push_swap',
        },
        {
          year: '2025',
          title: 'fract-ol — Mandelbrot ve Julia Fraktalları',
          role: '42 Projesi',
          desc: '42 kapsamında C ile yazdığım, Mandelbrot ve Julia fraktallarını MiniLibX ile etkileşimli olarak çizen bir proje. İki küme de aynı kaçış süresi (escape-time) algoritmasını kullanıyor: z² + c işlemini tekrarlayıp her pikseli ne kadar hızlı kaçtığına göre renklendiriyor; Julia sabiti komut satırı argümanlarıyla veriliyor. Pikseller doğrudan bir görüntü tamponuna yazılıyor, fare tekerleği imlecin bulunduğu noktaya doğru yakınlaştırıp uzaklaştırıyor ve ok tuşları görüntüyü kaydırıyor.',
          tags: ['C', 'MiniLibX', 'Fractals', 'Computer Graphics'],
          image: '/fract-ol.jpg',
          url: 'https://github.com/afeyzaayus/fract-ol',
        },
        {
          year: '2025',
          title: 'Site Management System',
          role: 'Backend Developer & Ürün Yöneticisi',
          desc: 'CSE343 Yazılım Mühendisliği dersi kapsamında ekip olarak geliştirdiğimiz bir site yönetim sistemi: yöneticiler için web paneli, site sakinleri için mobil uygulama. Yöneticiler web panelinden duyuru ekleyebiliyor, aidat ödemelerini manuel olarak girebiliyor ve site sakinlerinin bilgilerini kaydedebiliyor; site sakinleri ise mobil uygulamadan duyuruları görüntüleyip şikayet ve önerilerini yazabiliyor. Backend Node.js (Express.js) ve Supabase PostgreSQL veritabanı ile, web paneli HTML, CSS ve JavaScript ile, mobil uygulama ise Flutter ile geliştirildi. Ürün Yöneticisi olarak ürün planlamasını ve gereksinim analizini yönettim, backend geliştirici olarak sunucu tarafını yazdım ve görev ile iş akışlarını Jira ile takip ettim.',
          tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'Flutter', 'HTML/CSS/JS', 'Ürün Yönetimi', 'Jira'],
          image: '',
          url: 'https://github.com/afeyzaayus/Site-Management-System',
        },
      ],
    },
    skills: {
      label: 'Yetenekler',
      heading: 'Projeye\nkatkılarım',
      categories: [
        {
          name: 'Yazılım Mühendisliği',
          items: ['Algoritma Tasarımı', 'Matematiksel Modelleme & Simülasyon', 'Sistem Tasarımı Temelleri'],
        },
        {
          name: 'Programlama & Framework\'ler',
          items: ['C', 'C++', 'Java', 'Node.js', 'Python', 'Django', 'SQL'],
        },
        {
          name: 'Simülasyon & Oyun',
          items: ['Gazebo', 'Unity', 'Pygame'],
        },
        {
          name: 'Sistemler & Ağ',
          items: ['Linux / Unix', 'İşletim Sistemi Kavramları', 'Ağ Temelleri'],
        },
        {
          name: 'Robotik & Otonom Sistemler',
          items: ['ROS 2', 'ArduPilot', 'Mission Planner', 'MAVLink', 'Haritalama & Konumlandırma', 'Rota Planlama'],
        },
        {
          name: 'Araçlar & İşbirliği',
          items: ['Git', 'GitHub', 'Docker', 'Postman', 'Jira', 'Agile / Scrum', 'Takım Çalışması', 'Teknik Dokümantasyon'],
        },
      ],
    },
    organizations: {
      label: 'Organizasyonlar',
      heading: 'Yarışmalar\nve topluluk',
      items: [
        {
          date: '2024 –',
          title: 'TEKNOFEST 2026 Uluslararası İHA Yarışması',
          role: 'GTU Kuzgun Takımı — Sabit Kanat, Yazılım Takımı Üyesi',
          desc: '2024\'ten beri GTU Kuzgun ekibinde sabit kanat kategorisinde yazılım geliştiriyorum. TEKNOFEST 2026\'da takım olarak dünya dördüncüsü olduk.',
        },
        {
          date: 'Ara 2025',
          title: 'Emlak Konut Akıllı Site Yönetimi Çözümleri İdeathonu',
          role: 'Takım Lideri',
          desc: '6–7 Aralık 2025\'te düzenlenen iki günlük ideathonda takım liderliği yaptım; mevcut site yönetim uygulamalarına site içi güvenli haberleşme sağlayan bir API konsepti geliştirdik.',
        },
        {
          date: 'Nis 2026',
          title: 'ASELSAN Güdüm Sistemleri Speed Bootcamp',
          role: 'Katılımcı',
          desc: '11 Nisan 2026\'da sektör profesyonellerinden güdüm sistemleri üzerine dinleme ve bazı sistemleri yerinde görme fırsatı buldum.',
        },
        {
          date: 'Haz 2026',
          title: 'Çözüm Sende 2026',
          role: 'Hackathon',
          desc: 'Deprem sonrası İHA görüntülerinden hasarlı binaları tespit eden, kapanan yolları belirleyip hedefe en kısa yolu Dijkstra algoritmasıyla hesaplayan bir çözüm geliştirdik. Takım olarak beşinci olduk.',
        },
      ],
    },
    writing: {
      label: 'Yazılar',
      heading: 'Teknik yazılarım\nve makalelerim',
      mediumCta: "Medium'da Takip Et",
      empty: "Huawei Student Developers topluluğundaki yazılarının linklerini gönder, her birini bu düzende, kart olarak buraya ekleyeyim.",
      readOn: "Medium'da oku",
    },
    contact: {
      label: 'İletişim',
      heading: 'Birlikte bir şeyler\ninşa edelim.',
      body: 'Şu an stajlar, iş birlikleri ve ilgi çekici problemler için müsaitim. Aklınızda bir şey varsa duymaktan mutluluk duyarım.',
      email: 'aysefeyzaserbest@gmail.com',
      emailLabel: 'E-posta gönder',
      links: [
        { label: 'LinkedIn', href: 'https://linkedin.com/in/ayşe-feyza-serbest-837716253/' },
        { label: 'GitHub', href: 'https://github.com/afeyzaayus' },
        { label: 'Medium', href: 'https://medium.com/@aysefeyzaserbest' },
      ],
    },
    footer: {
      copy: 'Ayşe Feyza Serbest. Özenle yapıldı.',
    },
  },
}

type Lang = 'en' | 'tr'

type Article = {
  title: string
  description: string
  image: string
  url: string
  source: string
  sourceInitials: string
  date: string
}

const HSD_SOURCE = 'Huawei Student Developers Türkiye'

const articles: Article[] = [
  {
    title: 'Bir Type Casting Hatası Bir Roketi Nasıl Yok Etti?',
    description:
      'Ariane 5 roketinin ilk uçuşunda 64 bitlik bir değerin 16 bitlik bir alana sığdırılmaya çalışılmasının yol açtığı taşma hatasının, roketi nasıl yok ettiğini anlatıyor.',
    image: 'https://miro.medium.com/v2/resize:fit:500/1*Iecguz7GU-D2bfzczZWBcQ.jpeg',
    url: 'https://medium.com/huawei-student-developers-turkiye/bir-type-casting-hatas%C4%B1-bir-roketi-nas%C4%B1l-yok-etti-5f898cee84d0',
    source: HSD_SOURCE,
    sourceInitials: 'HSD',
    date: '22.09.2026',
  },
  {
    title: 'Mühendislerin Yemini: Demir Yüzük',
    description:
      'Kanadalı mühendislerin yemin töreninde taktığı Demir Yüzük geleneğinin kökenini ve mühendislik etiğiyle bağını anlatıyor.',
    image: '',
    url: 'https://medium.com/huawei-student-developers-turkiye/m%C3%BChendislerin-yemini-demir-y%C3%BCz%C3%BCk-978597c5c76e',
    source: HSD_SOURCE,
    sourceInitials: 'HSD',
    date: '',
  },
  {
    title: 'Bir "Bug" Kaç Can Alır?',
    description:
      "Therac-25 radyoterapi cihazındaki yazılım hatalarının 1980'lerde hastalara ölümcül dozda radyasyon verilmesine yol açtığı, bir yazılım hatasının alabileceği en ağır sonucu anlatıyor.",
    image: 'https://miro.medium.com/v2/resize:fit:500/1*5IAjK6Q_h2cNs3yD-Kj8fw.png',
    url: 'https://medium.com/huawei-student-developers-turkiye/bir-bug-ka%C3%A7-can-al%C4%B1r-013d88aceeed',
    source: HSD_SOURCE,
    sourceInitials: 'HSD',
    date: '23.06.2026',
  },
  {
    title: "Ay'a İnişi Kurtaran Kadın: Margaret Hamilton",
    description:
      "Margaret Hamilton'ın yazdığı önceliklendirme mimarisinin, Apollo 11'in Ay inişi sırasında kritik bir hatayı nasıl yönetip görevi kurtardığını anlatıyor.",
    image: 'https://miro.medium.com/v2/resize:fit:700/1*v_woh-xhS6l8JsFVfK7qAg.jpeg',
    url: 'https://medium.com/huawei-student-developers-turkiye/aya-i%CC%87ni%C5%9Fi-kurtaran-kad%C4%B1n-margaret-hamilton-1a6378d8cb41',
    source: HSD_SOURCE,
    sourceInitials: 'HSD',
    date: '26.05.2026',
  },
  {
    title: 'Mars Pathfinder: Küçük Bir Yazılım Hatası Nasıl Krize Yol Açtı?',
    description:
      "Mars Pathfinder uzay aracının görev yönetim yazılımında yaşanan 'priority inversion' hatasının ve NASA'nın bunu 'priority inheritance' algoritmasıyla nasıl çözdüğünün hikayesi.",
    image: 'https://miro.medium.com/v2/resize:fit:700/1*IOAWciCUjIXcAUGuy71zew.jpeg',
    url: 'https://medium.com/huawei-student-developers-turkiye/mars-pathfinder-k%C3%BC%C3%A7%C3%BCk-bir-yaz%C4%B1l%C4%B1m-hatas%C4%B1-nas%C4%B1l-krize-yol-a%C3%A7t%C4%B1-633346af285e',
    source: HSD_SOURCE,
    sourceInitials: 'HSD',
    date: '03.05.2026',
  },
]

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="4" y1="20" x2="20" y2="20" />
    </svg>
  )
}

const skillIcons: Record<string, string> = {
  C: 'c',
  'C++': 'cplusplus',
  Java: 'java',
  'Node.js': 'nodedotjs',
  Python: 'python',
  Django: 'django',
  SQL: 'sql',
  Unity: 'unity',
  'Linux / Unix': 'linux',
  'ROS 2': 'ros',
  Git: 'git',
  GitHub: 'github',
  Docker: 'docker',
  Postman: 'postman',
  Jira: 'jira',
}

function SkillIcon({ name }: { name: string }) {
  const url = `url(/icons/${name}.svg)`

  return (
    <span
      aria-hidden="true"
      style={{
        width: '18px',
        height: '18px',
        flexShrink: 0,
        backgroundColor: 'currentColor',
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}

function ArticleCard({ article, readLabel }: { article: Article; readLabel: string }) {
  const [hover, setHover] = useState(false)

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '1.5rem',
        alignItems: 'start',
        padding: '2rem 0',
        borderTop: '1px solid var(--border)',
        textDecoration: 'none',
        color: 'inherit',
        backgroundColor: hover ? 'var(--muted)' : 'transparent',
        transition: 'background-color 0.2s',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
          <span
            style={{
              width: '22px',
              height: '22px',
              flexShrink: 0,
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              color: 'var(--background)',
              fontSize: '0.6rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {article.sourceInitials}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
            {article.source}
            {article.date ? ` · ${article.date}` : ''}
          </span>
        </div>
        <h3
          className="font-display"
          style={{ fontSize: '1.3rem', fontWeight: 400, marginBottom: '0.5rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}
        >
          {article.title}
        </h3>
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--muted-foreground)',
            lineHeight: 1.7,
            marginBottom: '0.85rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontWeight: 300,
          }}
        >
          {article.description}
        </p>
        <span
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          {readLabel} <ExternalLinkIcon />
        </span>
      </div>
      {article.image && (
        <img
          src={article.image}
          alt=""
          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border)' }}
        />
      )}
    </a>
  )
}

type WorkProject = {
  year: string
  title: string
  role: string
  desc: string
  tags: string[]
  image: string
  url: string
}

function ProjectMediaCard({ project, viewLabel }: { project: WorkProject; viewLabel: string }) {
  const [hover, setHover] = useState(false)
  const linked = Boolean(project.url)
  const badge = linked
    ? 'GH'
    : project.title
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

  const cardStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '2rem',
    alignItems: 'start',
    padding: '2.5rem 0',
    borderTop: '1px solid var(--border)',
    textDecoration: 'none',
    color: 'inherit',
    backgroundColor: linked && hover ? 'var(--muted)' : 'transparent',
    transition: 'background-color 0.2s',
  }

  const content = (
    <>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
          <span
            style={{
              width: '22px',
              height: '22px',
              flexShrink: 0,
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              color: 'var(--background)',
              fontSize: '0.6rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {badge}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
            {project.role} · {project.year}
          </span>
        </div>
        <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: '1rem', fontWeight: 300 }}>
          {project.desc}
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: linked ? '1rem' : 0 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '2px 8px',
                color: 'var(--muted-foreground)',
                fontWeight: 300,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {linked && (
          <span
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            {viewLabel} <ExternalLinkIcon />
          </span>
        )}
      </div>
      {project.image && (
        <img
          src={project.image}
          alt=""
          style={{ width: '300px', height: 'auto', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border)' }}
        />
      )}
    </>
  )

  return linked ? (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={cardStyle}
    >
      {content}
    </a>
  ) : (
    <div style={cardStyle}>{content}</div>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [menuOpen, setMenuOpen] = useState(false)

  const t = translations[lang]
  const year = new Date().getFullYear()

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [dark])

  const navItems = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.work, href: '#work' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.organizations, href: '#organizations' },
    { label: t.nav.writing, href: '#writing' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh' }}>
      {/* NAV */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--background)',
          transition: 'background-color 0.3s ease',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#" className="font-display" style={{ fontSize: '1.1rem', fontWeight: 400, letterSpacing: '-0.02em', textDecoration: 'none', color: 'var(--foreground)' }}>
            AFS
          </a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden-mobile">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--muted-foreground)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--muted-foreground)',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '3px',
                padding: '3px 8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 400,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--foreground)'; e.currentTarget.style.borderColor = 'var(--foreground)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-foreground)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {lang === 'en' ? 'TR' : 'EN'}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(!dark)}
              style={{
                color: 'var(--muted-foreground)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
              aria-label="Toggle theme"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Hamburger (mobile) */}
            <button
              className="show-mobile"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: 'var(--muted-foreground)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'none' }}
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="8" x2="21" y2="8" />
                    <line x1="3" y1="16" x2="21" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              borderTop: '1px solid var(--border)',
              backgroundColor: 'var(--background)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: '0.85rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--muted-foreground)',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '100px 2rem 4rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: 400 }}>
            {t.hero.greeting}
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              color: 'var(--foreground)',
            }}
          >
            {t.hero.name}
          </h1>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.2,
              color: 'var(--muted-foreground)',
              marginBottom: '2rem',
              whiteSpace: 'pre-line',
            }}
          >
            {t.hero.role}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--muted-foreground)', marginBottom: '3rem', maxWidth: '480px', fontWeight: 300 }}>
            {t.hero.tagline}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="#work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--foreground)',
                color: 'var(--background)',
                padding: '0.7rem 1.5rem',
                borderRadius: '3px',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 400,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {t.hero.cta} <ArrowRightIcon />
            </a>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                padding: '0.7rem 1.5rem',
                borderRadius: '3px',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 400,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--foreground)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              {t.hero.ctaSecondary}
            </a>
            <a
              href="/Ayse_Feyza_SERBEST_CV.pdf"
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--muted-foreground)',
                padding: '0.7rem 0.25rem',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 400,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
            >
              <DownloadIcon /> {t.hero.cvLabel}
            </a>
          </div>
        </div>

        {/* Decorative element */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className="hidden-mobile">
          <div style={{ position: 'relative', width: '240px', height: '320px' }}>
            <div style={{ position: 'absolute', inset: 0, border: '1px solid var(--border)', borderRadius: '2px' }} />
            <div style={{ position: 'absolute', top: '16px', left: '16px', right: '-16px', bottom: '-16px', border: '1px solid var(--accent)', opacity: 0.3, borderRadius: '2px' }} />
            <div style={{ position: 'absolute', inset: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem' }}>
              <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--accent)', marginBottom: '0.75rem' }} />
              <p className="font-display" style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                "{t.hero.quote}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '6rem 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: 400 }}>
              — {t.about.label}
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                whiteSpace: 'pre-line',
              }}
            >
              {t.about.heading}
            </h2>
          </div>
          <div style={{ paddingTop: '3.5rem' }}>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', marginBottom: '1.25rem', lineHeight: 1.8, fontWeight: 300 }}>
              {t.about.body}
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', marginBottom: '2rem', lineHeight: 1.8, fontWeight: 300 }}>
              {t.about.body2}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }} />
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.04em', color: 'var(--muted-foreground)' }}>{t.about.available}</span>
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{ padding: '6rem 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '4rem' }}>
            <div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem', fontWeight: 400 }}>
                — {t.work.label}
              </p>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>
                {t.work.heading}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {t.work.projects.map((project, i) => (
              <ProjectMediaCard key={i} project={project} viewLabel={t.work.viewOnGithub} />
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: '6rem 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem', fontWeight: 400 }}>
              — {t.skills.label}
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', whiteSpace: 'pre-line' }}>
              {t.skills.heading}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
            {t.skills.categories.map((cat) => (
              <div key={cat.name}>
                <h3 style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: 400 }}>
                  {cat.name}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        fontSize: '0.95rem',
                        color: 'var(--muted-foreground)',
                        paddingBottom: '0.75rem',
                        borderBottom: '1px solid var(--border)',
                        fontWeight: 300,
                        transition: 'color 0.2s',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                    >
                      <span>{item}</span>
                      {skillIcons[item] && <SkillIcon name={skillIcons[item]} />}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORGANIZATIONS */}
      <section id="organizations" style={{ padding: '6rem 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem', fontWeight: 400 }}>
              — {t.organizations.label}
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', whiteSpace: 'pre-line' }}>
              {t.organizations.heading}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {t.organizations.items.map((org, i) => (
              <div
                key={i}
                style={{
                  borderTop: '1px solid var(--border)',
                  padding: '2rem 0',
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  gap: '2rem',
                  alignItems: 'start',
                }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', paddingTop: '0.25rem', fontWeight: 300 }}>
                  {org.date}
                </span>
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 400, marginBottom: '0.35rem', letterSpacing: '-0.01em' }}>
                    {org.title}
                  </h3>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.6rem', fontWeight: 400 }}>
                    {org.role}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', lineHeight: 1.7, fontWeight: 300 }}>
                    {org.desc}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section id="writing" style={{ padding: '6rem 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '4rem' }}>
            <div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem', fontWeight: 400 }}>
                — {t.writing.label}
              </p>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', whiteSpace: 'pre-line' }}>
                {t.writing.heading}
              </h2>
            </div>
            <a
              href="https://medium.com/@aysefeyzaserbest"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                padding: '0.7rem 1.5rem',
                borderRadius: '3px',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 400,
                transition: 'border-color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--foreground)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              {t.writing.mediumCta} <ArrowRightIcon />
            </a>
          </div>

          {articles.length === 0 ? (
            <div
              style={{
                border: '1px dashed var(--border)',
                borderRadius: '6px',
                padding: '3rem 2rem',
                textAlign: 'center',
                color: 'var(--muted-foreground)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}
            >
              {t.writing.empty}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {articles.map((article, i) => (
                <ArticleCard key={i} article={article} readLabel={t.writing.readOn} />
              ))}
              <div style={{ borderTop: '1px solid var(--border)' }} />
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '6rem 2rem 8rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: 400 }}>
              — {t.contact.label}
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                whiteSpace: 'pre-line',
                marginBottom: '1.5rem',
              }}
            >
              {t.contact.heading}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.8, maxWidth: '380px', fontWeight: 300 }}>
              {t.contact.body}
            </p>
          </div>

          <div style={{ paddingTop: '3.5rem' }}>
            <a
              href={`mailto:${t.contact.email}`}
              style={{
                display: 'block',
                marginBottom: '3rem',
                textDecoration: 'none',
              }}
            >
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '0.5rem', fontWeight: 300 }}>
                {t.contact.emailLabel}
              </p>
              <p
                className="font-display"
                style={{ fontSize: '1.3rem', fontWeight: 300, color: 'var(--foreground)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              >
                {t.contact.email}
              </p>
            </a>

            <div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '1rem', fontWeight: 300 }}>
                Online
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {t.contact.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--muted-foreground)',
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                      transition: 'color 0.2s',
                      fontWeight: 300,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                  >
                    {link.label}
                    <ExternalLinkIcon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="font-display" style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', fontStyle: 'italic', fontWeight: 300 }}>
            © {year} {t.footer.copy}
          </span>
          <a href="#" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
          >
            ↑ Top
          </a>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (max-width: 700px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          section > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: 100px 1fr"] {
            grid-template-columns: 70px 1fr !important;
          }
          [style*="grid-template-columns: 1fr auto"] {
            grid-template-columns: 1fr !important;
          }
          [style*="grid-template-columns: 1fr auto"] img {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
