import { describe, test, expect, assert, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import App from './App';
import { Suspense } from 'react';
import { links } from './assets/links';


vi.mock('./components/experience/experiences', () => ({
    __esModule: true,
    default: () => <div data-testid="mocked-experiences">Mocked Experiences</div>
}));

vi.mock('./components/education/Educations', () => ({
    __esModule: true,
    default: () => <div data-testid="mocked-educations">Mocked Educations</div>
}));

vi.mock('./components/skills/skills', () => ({
    __esModule: true,
    default: () => <div data-testid="mocked-skills">Mocked Skills</div>
}));

vi.mock('./components/ThemeModeSwitcher', () => ({
    __esModule: true,
    default: () => <div data-testid="mocked-theme-mode-switcher">Mocked Theme Mode Switcher</div>
}));

vi.mock('./components/LanguageSwitcher', () => ({
    __esModule: true,
    default: () => <div data-testid="mocked-language-switcher">Mocked Language Switcher</div>
}));

vi.mock('./hooks/useI18n', () => ({
    useI18n: () => ({
        t: (key: string) => key,
        i18n: {},
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formatDate: (dateString: string, _formatString: string = "MMMM yyyy", _enforceCapitalizeFirstLetter = false) => dateString
    })
}));


describe('App - mobile', {}, () => {
    let wrapper: RenderResult;
    beforeEach(async () => {
        wrapper = render(
            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>
        );

        await new Promise((r) => setTimeout(r, 1000));
    });

    afterEach(() => {
        wrapper.unmount();
    });

    
    test('App mounts properly', async () => {
        expect(wrapper.container).toBeTruthy();

        expect(wrapper.getByTestId('mocked-experiences')).toBeTruthy();
        expect(wrapper.getByTestId('title').innerText).toBe('Alexi Courieux');
        expect(wrapper.getByTestId('github-link').getAttribute('href')).toBe(links.github);
        expect(wrapper.getByTestId('linkedin-link').getAttribute('href')).toBe(links.linkedin);
    })

    test('App drawer is functional', async () => {
        const drawerButton = wrapper.getByTestId('drawer-toggle');
        drawerButton.click();

        await vi.waitFor(() => {
            expect(wrapper.getByTestId('mocked-language-switcher')).toBeTruthy();
            expect(wrapper.getByTestId('mocked-theme-mode-switcher')).toBeTruthy();
        }, {interval: 500, timeout: 3000});
    })
});
