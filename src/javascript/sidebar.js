export function toggleSidebar(name) {
    const sidebar = document.getElementById(name);
    //const content = document.getElementById('content');
    if (sidebar.style.transform === 'translateX(-360px)') {
        sidebar.style.transform = 'translateX(0)';
        //content.style.marginLeft = '250px';
    } else {
        sidebar.style.transform = 'translateX(-360px)';
        //content.style.marginLeft = '0';
    }
}