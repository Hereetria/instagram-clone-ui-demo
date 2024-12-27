// ====================================
// SCROLLING FUNCTIONALITY
// ====================================
// JavaScript to handle smooth scrolling for left and right arrows
const scrollContainer = document.getElementById('scrollContainer');
const scrollAmount = 150; // Scroll amount in pixels

// Scroll Left button click event
document.getElementById('scrollLeft').addEventListener('click', function () {
  scrollContainer.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});

// Scroll Right button click event
document.getElementById('scrollRight').addEventListener('click', function () {
  scrollContainer.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

// ====================================
// TEXTAREA AND POST LINK FUNCTIONALITY
// ====================================
// JavaScript to show the "Post" link only if the textarea contains more than 1 character
const textarea = document.getElementById('comment-textarea');
const postLink = document.getElementById('post-link');

// Listen for input event in the textarea
textarea.addEventListener('input', function() {
  // Adjust the height of the textarea as the user types
  this.style.height = 'auto';  // Reset the height
  this.style.height = Math.min(this.scrollHeight, 80) + 'px';  // Set height, up to a maximum of 80px

  // If the textarea has content, make the post link visible, otherwise hide it
  if (textarea.value.length > 0) {
    postLink.style.display = 'flex';  // Make the Post link visible
  } else {
    postLink.style.display = 'none';  // Make the Post link invisible
  }
});

const bootstrapScript = document.createElement('script');
bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
bootstrapScript.integrity = 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz';
bootstrapScript.crossOrigin = 'anonymous';
document.body.appendChild(bootstrapScript);


function adjustNavbarWidth() {
  const wrapper = document.querySelector('.full-screen-wrapper');
  const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
  const navbar = document.querySelector('#navbar');
  const pageWidth = window.innerWidth;

  if (pageWidth > 630) {
    const newWidth = 630 + (pageWidth - 630) / 2;
    navbar.style.width = `${newWidth}px`;
  } else {
    if (hasScrollbar) {
      navbar.style.width = 'calc(100vw - 17px)';
    } else {
      navbar.style.width = '100vw';
    }
  }



  if (hasScrollbar) {
    wrapper.style.width = "calc(100vw - 17px)";
    cal
  } else {
    wrapper.style.width = "100vw";
  }
}

// Sayfa yüklendiğinde ve pencere boyutu değiştiğinde fonksiyonu çağırın
window.addEventListener('load', adjustNavbarWidth);
window.addEventListener('resize', adjustNavbarWidth);



const dropdownToggle = document.getElementById('dropdownUser1');
const dropdownMenu = document.getElementById('customDropdownMenu');

dropdownToggle.addEventListener('click', (event) => {
  event.preventDefault();
  const rect = dropdownToggle.getBoundingClientRect();
  dropdownMenu.style.top = `${rect.bottom}px`;
  dropdownMenu.style.left = `${rect.left}px`;
  dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
});

// Menü dışına tıklandığında dropdown'u kapatma
document.addEventListener('click', (event) => {
  if (!dropdownMenu.contains(event.target) && !dropdownToggle.contains(event.target)) {
    dropdownMenu.style.display = 'none';
  }
});


const toggleText = document.getElementById('toggleText');

// Tıklama olayını dinliyoruz
toggleText.addEventListener('click', function() {
  // Metni kontrol edip, değiştiriyoruz
  if (toggleText.textContent === 'For you') {
    toggleText.textContent = 'Following'; // Metni "Following" olarak değiştir
  } else {
    toggleText.textContent = 'For you'; // Eğer "Following" ise, tekrar "For you" yap
  }
});


const overlay = document.getElementById('overlay');
const switchAccountCloseButton = document.getElementById('switchAccountCloseButton');

switchAccountCloseButton.addEventListener('click', function(){
  overlay.style.visibility = 'hidden';
})

// Button ve overlay elementlerini seçiyoruz
const switchButton = document.getElementById('switchButton');
const switchAccount = document.getElementById('switchAccount');
const logExistingAccountLink = document.getElementById('logExistingAccountLink');

logExistingAccountLink.addEventListener('click', function(event) {
  event.preventDefault()
  switchAccount.style.display = 'none';
  login.style.setProperty('display', 'flex', 'important');
})
// Button'a tıklanma olayını ekliyoruz
switchButton.addEventListener('click', function(event) {
  event.preventDefault()
  overlay.style.visibility = 'visible';
  switchAccount.style.setProperty('display', 'flex', 'important');
});

const password = document.getElementById('password');
const showHide = document.getElementById('showHide');
const showHideLink = document.getElementById('showHideLink');

showHideLink.addEventListener('click', function(event) {
  event.preventDefault(); // Sayfanın yenilenmesini engeller

  if (password.type === 'password') {
    
    password.type = 'text'; // Password'u görünür yap
    showHide.textContent = 'Hide'; // Buton yazısını "Hide" yap
  } else {
    password.type = 'password'; // Password'u gizle
    showHide.textContent = 'Show'; // Buton yazısını "Show" yap
  }
});

const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', function(event) {
  event.preventDefault();
  loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
})

// Input ve icon öğelerini seç
const searchBars = document.querySelectorAll('.searchBar');
const searchBarIcons = document.querySelectorAll('.searchBarIcon');

searchBars.forEach((searchBar, index) => {
  let searchBarIcon = searchBarIcons[index]; // İlgili ikon

  searchBar.addEventListener("focus", () => {
    searchBar.placeholder = "Search";
    if (searchBarIcon) {
      searchBarIcon.classList.remove('d-flex');
      searchBarIcon.classList.add('d-none');
    }
});


  searchBar.addEventListener('blur', () => {
    if (searchBarIcon && searchBar.value === '') {
      searchBarIcon.classList.remove('d-none');
      searchBarIcon.classList.add('d-flex');
    }
  });
});

searchBars.forEach(function(searchBar) {
  searchBar.addEventListener("blur", () => {
    searchBar.placeholder = "     Search";
  });
})

// Tüm clear search ikonlarını seç
const clearSearchLinks = document.querySelectorAll('.clearSearchLink');

// Her clear link için tıklama olayını tanımla
clearSearchLinks.forEach(clearSearchLink => {
  clearSearchLink.addEventListener('click', event => {
    event.preventDefault(); // Default davranışı engelle

    // Tüm searchBar'ların değerini temizle
    searchBars.forEach((searchBar, index) => {
      searchBar.value = ''; // Input değerini temizle
      let searchBarIcon = searchBarIcons[index];
      if (searchBarIcon) {
        searchBarIcon.classList.remove('d-none');
        searchBarIcon.classList.add('d-flex');
      }

    });
  });
});

// Tüm .search-profile öğelerini seç
const searchProfiles = document.querySelectorAll('.search-profile');

searchProfiles.forEach(function(searchedProfile) {

  // Click eventi: A etiketi dışında bir yere tıklanırsa
  searchedProfile.addEventListener('click', function(event) {
    if (!event.target.closest('a')) {
      window.location.href = '#';
    }
  });

  // Mousedown eventi: Tıklama anında div'i koyulaştır ve soluklaştır
  searchedProfile.addEventListener('mousedown', function () {
    searchedProfile.style.transition = 'filter 0.3s ease, opacity 0.3s ease'; // Geçiş efekti
    searchedProfile.style.filter = 'brightness(0.8)';  // Koyulaştırmak için brightness değerini düşür
    searchedProfile.style.opacity = '0.7';  // Soluklaştırmak için opacity değerini düşür
  });

  // Mouseup eventi: Tıklama bırakıldığında orijinal haline dön
  searchedProfile.addEventListener('mouseup', function () {
    searchedProfile.style.filter = '';  // Varsayılan haline döner
    searchedProfile.style.opacity = '';  // Varsayılan haline döner
  });

  // Mouseleave eventi: Mouse div'in dışına çıkarsa, orijinal haline döner
  searchedProfile.addEventListener('mouseleave', function () {
    searchedProfile.style.filter = '';  // Varsayılan haline döner
    searchedProfile.style.opacity = '';  // Varsayılan haline döner
  });

  // Mouseover eventi: Div üzerine gelindiğinde cursor pointer ve arka plan rengi değişir
  searchedProfile.addEventListener('mouseover', function(event) {
    if (!event.target.closest('a')) {
      searchedProfile.style.cursor = 'pointer'; // Pointer cursor ekle
      searchedProfile.style.backgroundColor = 'rgb(55, 63, 68)';
    }
  });

  // Mouseout eventi: Div dışına çıkıldığında cursor'u normal yap ve arka plan rengini geri al
  searchedProfile.addEventListener('mouseout', function() {
    searchedProfile.style.cursor = 'default'; // Normal cursor'a dön
    searchedProfile.style.backgroundColor = 'rgb(33, 37, 41)';
  });
});

const clearAllLinks = document.querySelectorAll('.clearAllLink'); // clearAllLink öğelerini seçiyoruz

clearAllLinks.forEach(function(clearAllLink) {
  const clearAllText = clearAllLink.querySelector('.clearAllText'); // clearAllLink içindeki .clearAllText öğesini seçiyoruz

  // Mouse ile öğenin üzerine gelindiğinde rengi beyaza döndürme
  clearAllLink.addEventListener('mouseover', function() {
    clearAllText.style.transition = 'color 0.3s ease'; // Geçiş efekti
    clearAllText.style.color = 'white'; // Rengi beyaza döndür
  });

  // Mouse öğe üzerinden çekildiğinde, rengi eski haline döndürme
  clearAllLink.addEventListener('mouseout', function() {
    clearAllText.style.transition = 'color 0.3s ease'; // Geçiş efekti
    clearAllText.style.setProperty('color', 'rgb(19, 133, 255)', 'important'); // Varsayılan rengi geri döndür
  });

  // Tıklama ile rengini gri yapma
  clearAllLink.addEventListener('mousedown', function() {
    clearAllText.style.transition = 'color 0.1s ease';
    clearAllText.style.color = '#6c757d'; // Tıklama ile rengi gri yapıyoruz
  });
});

const sidebarContent = document.getElementById('sidebarContent');
const sidebarContentInner = document.getElementById('sidebarContentInner');
const sidebarHideableItems = document.querySelectorAll('.sidebarHideableItem');
const sidebar = document.getElementById('sidebar');
const sidebarOpenable = document.getElementById('sidebarOpenable');
const links = document.querySelectorAll('.nav-item a[data-action]');
let previousClickedElementLink = document.querySelector('a[data-action="homeAction"]');
tempLink = null;

links.forEach(clickedElementLink => {
  clickedElementLink.addEventListener('click', (event) => {
    event.preventDefault(); // Sayfa yenilenmesini engelle
    const action = clickedElementLink.getAttribute('data-action'); // Tıklanan linkin data-action değeri

    // Simge veya resim sınıflarını değiştir
    toggleClickedElementLink(previousClickedElementLink, clickedElementLink);
    // Tıklanan linkin aksiyonuna göre işlem yap
    switch (action) {
      case 'homeAction':
        break;
        case 'searchAction':
          if (previousClickedElementLink.getAttribute('data-action') !== 'searchAction') {
              tempLink = previousClickedElementLink;
          }
          const searchProfiles = document.querySelector('#search');
          sidebarHideableItems.forEach(function(sidebarHideableItem) {
            sidebarHideableItem.classList.toggle('d-none');
            sidebarHideableItem.classList.toggle('d-inline');
        });
        
          sidebarContent.style.width = '68px';
          sidebarContentInner.style.width = '60px'
          sidebar.classList.add('sidebarBorder');
          sidebarOpenable.classList.remove('d-none');
          sidebarOpenable.classList.add('d-flex');
          searchProfiles.classList.remove('d-none');
          searchProfiles.classList.add('d-flex');
          
          
          // Sidebar dışına tıklanıp tıklanmadığını kontrol et
          document.addEventListener('click', function(event) {
              if (!sidebar.contains(event.target)) {
                sidebarOpenable.classList.remove('d-flex');
                sidebarOpenable.classList.add('d-none');
                sidebar.classList.remove('sidebarBorder');
                toggleClickedElementLink(clickedElementLink, tempLink);
                previousClickedElementLink = tempLink;
                sidebarContent.style.width = '235px';
                sidebarContentInner.style.width = '225px';
                sidebarHideableItems.forEach(function(sidebarHideableItem) {
                  sidebarHideableItem.classList.remove('d-none');
                  sidebarHideableItem.classList.add('d-inline');
              });
              }
          });
      
          console.log(tempLink.getAttribute('data-action'));
          console.log(action);
          break;
      
      case 'exploreAction':
        break;
      case 'reelsAction':
        break;
      case 'messagesAction':
        break;
      case 'notificationsAction':
        if (previousClickedElementLink.getAttribute('data-action') !== 'notificationsAction') {
          tempLink = previousClickedElementLink;
        }
        break;
      case 'createAction':
        break;
      case 'profileAction':
        break;
      // Diğer aksiyonlar için de benzer yapı ekleyebilirsiniz
    }
    previousClickedElementLinkAction = previousClickedElementLink.getAttribute('data-action');
    // previousClickedElementLink değerini güncelle
    if (previousClickedElementAction !== action) {
      previousClickedElementLink = clickedElementLink;
    } else {
      if (action === 'searchAction' || action === 'notificationsAction') {
        previousClickedElementLink = tempLink;
        sidebarOpenable.classList.remove('d-flex');
        sidebarOpenable.classList.add('d-none');
        sidebar.classList.remove('sidebarBorder');
        toggleClickedElementLink(clickedElementLink, previousClickedElementLink);
      } else {
      }
    }
  });
});

function toggleClickedElementLink(previousClickedElementLink, clickedElementLink) {
  previousClickedElementAction = previousClickedElementLink.getAttribute('data-action');
  // previousClickedElementLink'in içindeki icon veya img'leri seç
  const previousActiveIcon = previousClickedElementLink.querySelector('.sidebarIconActive');
  const previousPassiveIcon = previousClickedElementLink.querySelector('.sidebarIconPassive');
  
  // Eğer önceki öğe varsa, önceki öğenin aktif ve pasif icon'larının sınıflarını değiştir
  if (previousActiveIcon && previousPassiveIcon) {
    previousActiveIcon.classList.add('d-none');  // Önceki aktif icon'ı gizle
    previousPassiveIcon.classList.remove('d-none');  // Önceki pasif icon'ı göster
    previousPassiveIcon.classList.add('d-inline');
  }

  // clickedElementLink'in içindeki icon veya img'leri seç
  const clickedActiveIcon = clickedElementLink.querySelector('.sidebarIconActive');
  const clickedPassiveIcon = clickedElementLink.querySelector('.sidebarIconPassive');
  
  // Tıklanan öğenin aktif ve pasif icon'larının sınıflarını değiştir
  if (clickedActiveIcon && clickedPassiveIcon) {
    clickedPassiveIcon.classList.add('d-none');  // Tıklanan öğenin pasif icon'unu gizle
    clickedActiveIcon.classList.remove('d-none');  // Tıklanan öğenin aktif icon'unu göster
    clickedActiveIcon.classList.add('d-inline');
  }
}
