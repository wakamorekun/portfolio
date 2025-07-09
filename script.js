// 初期化
const initAnimations = () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
};

// スクロール効果
const handleNavScroll = () => {
    const navbar = document.getElementById('mainNav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        if (scrollTop > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }

        // 表示/非表示
        if (scrollTop > lastScrollTop) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
};

// スムーズスクロール
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.getElementById('mainNav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// プロフィールセクションのアニメーション
const initProfileAnimations = () => {
    const profileImage = document.querySelector('.profile-image img');
    const profileContent = document.querySelector('.profile-content');
    const profileStats = document.querySelectorAll('.stat-item');

    // 統計アイテムのスケールアニメーション 
    profileStats.forEach((stat, index) => {
        stat.addEventListener('mouseenter', () => {
            stat.style.transform = 'scale(1.1)';
            stat.style.transition = 'transform 0.3s ease';
            stat.style.zIndex = '10';
        });

        stat.addEventListener('mouseleave', () => {
            stat.style.transform = 'scale(1)';
            stat.style.zIndex = '1';
        });
    });
};

// ページスクロールで表示されたらアニメーション
document.addEventListener("DOMContentLoaded", () => {
  const profile = document.querySelector(".profile");

  function onScroll() {
    const rect = profile.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 100;

    if (inView) {
      profile.classList.add("visible");
      window.removeEventListener("scroll", onScroll);
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); // 初回チェック
});


// カウンターアニメーション
const initCounterAnimation = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
};

// スキルバー
const initSkillBarAnimation = () => {
    const skillBars = document.querySelectorAll('.progress-bar');
    const skillSection = document.getElementById('skill');

    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); 

    observer.observe(skillSection);
};

const initWorkItemHover = () => {
    const workItems = document.querySelectorAll('.work-item');

    workItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
};

// メールアドレスコピー機能
const initEmailCopy = () => {
    const emailLink = document.getElementById('emailLink');
    const emailAddress = 't.kokubo.sys24@morijyobi.ac.jp';

    emailLink.addEventListener('click', (e) => {
        e.preventDefault();

        navigator.clipboard.writeText(emailAddress).then(() => {
            const originalText = emailLink.querySelector('span').textContent;
            emailLink.querySelector('span').textContent = 'コピーしました！';
            
            setTimeout(() => {
                emailLink.querySelector('span').textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('メールアドレスのコピーに失敗しました:', err);
            const textArea = document.createElement("textarea");
            textArea.value = emailAddress;
            textArea.style.position = "fixed"; 
            textArea.style.left = "-999999px"; 
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
        });
    });
};

// フローティングアニメーションの初期化
const initFloatingAnimation = () => {
    const profileImage = document.querySelector('.profile-image img');
};

// トップ初期化
const initBackToTopButton = () => {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.title = 'ページ上部へ';
    backToTopBtn.innerText = '▲';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

//初期化
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    handleNavScroll();
    initSmoothScroll();
    initProfileAnimations();
    initFloatingAnimation(); // Defined but now does nothing for profile image
    initCounterAnimation();
    initSkillBarAnimation();
    initWorkItemHover();
    initEmailCopy();
    initBackToTopButton();

    // ページロード
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});