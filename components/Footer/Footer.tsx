import * as React from 'react';

// configs
import * as config from 'lib/config';

// components
import SocialLinks from 'components/SocialLinks';

// icons
import { IoSunnyOutline, IoMoonSharp } from 'react-icons/io5';

// styles
import styles from './footer.module.css';

const Footer: React.FC<{
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}> = ({ isDarkMode, toggleDarkMode }) => {
    const [hasMounted, setHasMounted] = React.useState(false);
    const musicPlayer = React.useRef<HTMLAudioElement | null>(null);
    const toggleDarkModeCb = React.useCallback(
        (e) => {
            e.preventDefault();
            toggleDarkMode();
            musicPlayer.current?.play();
        },
        [toggleDarkMode, musicPlayer]
    );

    React.useEffect(() => {
        setHasMounted(true);
        // Check if Calendly is available in the window object
        initCalendly();
        function initCalendly() {
            if (typeof window !== 'undefined' && (window as any).Calendly) {
                (window as any).Calendly.initBadgeWidget({
                    url: 'https://calendly.com/ricky_nguyen/30min',
                    text: 'Coffee talk with me!',
                    color: '#070707',
                    textColor: '#ffffff'
                });
            }
        }
    }, []);

    const copyRightYear = new Date().getUTCFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.copyright}>
                Copyright {copyRightYear} @{config.author}
            </div>

            {hasMounted ? (
                <div className={styles.settings}>
                    <a
                        className={styles.toggleDarkMode}
                        onClick={toggleDarkModeCb}
                        title='Tottle dark mode'
                    >
                        {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
                    </a>
                </div>
            ) : null}

            <div className={styles.social}>
                <SocialLinks />
            </div>
            <div className={styles.music} style={{ display: 'none' }}>
                <audio src='./switch.mp3' ref={musicPlayer} controls />
            </div>
        </footer>
    );
};

export default Footer;
