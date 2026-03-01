(function() {
    const POPUNDER_URL = "https://www.google.com";
    const MAX_POPS_PER_DAY = 33;
    const COOKIE_DAYS = 11;
    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${value};expires=${expires};path=/`;
    }
    
    function canShowPopunder() {
        const today = new Date().toDateString();
        const count = parseInt(getCookie('pop_count') || '0');
        const lastDate = getCookie('pop_last_date');
        return !lastDate || lastDate !== today || count < MAX_POPS_PER_DAY;
    }
    
    function forcePopunder() {
        const pop = window.open('about:blank', '_blank');
        if (pop) {
            pop.document.write(`<script>window.location.href='${POPUNDER_URL}';window.blur();if(window.opener)window.opener.focus();</script>`);
            pop.document.close();
            window.focus();
            const today = new Date().toDateString();
            const count = parseInt(getCookie('pop_count') || '0') + 1;
            setCookie('pop_count', count, COOKIE_DAYS);
            setCookie('pop_last_date', today, COOKIE_DAYS);
            return true;
        }
        return false;
    }
    
    let clickTriggered = false;
    
    function handleAnyClick(e) {
        if (clickTriggered) return;
        if (e.isTrusted && canShowPopunder()) {
            clickTriggered = true;
            setTimeout(forcePopunder, 50);
        }
    }
    
    document.addEventListener('click', handleAnyClick, true);
    document.addEventListener('mousedown', handleAnyClick, true);
    document.addEventListener('mouseup', handleAnyClick, true);
    document.addEventListener('touchstart', handleAnyClick, true);
    document.addEventListener('touchend', handleAnyClick, true);
    
    window.addEventListener('beforeunload', function() {
        if (!clickTriggered && canShowPopunder()) {
            forcePopunder();
        }
    });
})();
