import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
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

describe('App - mobile', { }, () => {
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
        wrapper?.unmount();
    });

    
    test('Mounts properly', async () => {
        expect(wrapper.container).toBeTruthy();
        
        expect(wrapper.getByTestId('title').innerText).toBe('Alexi Courieux');
        expect(wrapper.getByTestId('github-link').getAttribute('href')).toBe(links.github);
        expect(wrapper.getByTestId('linkedin-link').getAttribute('href')).toBe(links.linkedin);
        
        expect(wrapper.getByTestId('mocked-experiences')).toBeTruthy();
        expect(wrapper.queryByTestId('mocked-educations')).toBeNull();
        expect(wrapper.queryByTestId('mocked-skills')).toBeNull();

        expect(wrapper.getByTestId('drawer-toggle')).toBeTruthy();
        expect(wrapper.getByTestId('bottom-navigation')).toBeTruthy();
        expect(wrapper.queryByTestId('mocked-theme-mode-switcher')).toBeNull();
        expect(wrapper.queryByTestId('mocked-language-switcher')).toBeNull();
    })

    test('Drawer is functional', async () => {
        const drawerButton = wrapper.getByTestId('drawer-toggle');
        drawerButton.click();

        await vi.waitFor(() => {
            expect(wrapper.getByTestId('mocked-language-switcher')).toBeTruthy();
            expect(wrapper.getByTestId('mocked-theme-mode-switcher')).toBeTruthy();
        }, {interval: 500, timeout: 3000});
    })

    test('Drawer closes when clicking on the backdrop', async () => {
        const drawerButton = wrapper.getByTestId('drawer-toggle');
        drawerButton.click();

        await vi.waitFor(() => {
            expect(wrapper.getByTestId('mocked-language-switcher')).toBeTruthy();
            expect(wrapper.getByTestId('mocked-theme-mode-switcher')).toBeTruthy();
        }, {interval: 500, timeout: 3000});

        const backdrop = wrapper.getByTestId('drawer').querySelector('.MuiBackdrop-root') as HTMLElement;
        backdrop.click();

        await vi.waitFor(() => {
            expect(wrapper.queryByTestId('mocked-language-switcher')).toBeFalsy();
            expect(wrapper.queryByTestId('mocked-theme-mode-switcher')).toBeFalsy();
        }, {interval: 500, timeout: 3000});
    })

    test('Navigation to education is functional', async () => {
        const educationButton = wrapper.getByTestId('education-tab-btn');
        educationButton.click();

        await vi.waitFor(() => {
            expect(wrapper.getByTestId('mocked-educations')).toBeTruthy();
        }, {interval: 500, timeout: 3000});
    })

    test('Navigation to skills is functional', async () => {
        const skillsButton = wrapper.getByTestId('skills-tab-btn');
        skillsButton.click();

        await vi.waitFor(() => {
            expect(wrapper.getByTestId('mocked-skills')).toBeTruthy();
        }, {interval: 500, timeout: 3000});
    })

    test('Navigation to experience is functional', async () => {
        const experienceButton = wrapper.getByTestId('experience-tab-btn');
        experienceButton.click();

        await vi.waitFor(() => {
            expect(wrapper.getByTestId('mocked-experiences')).toBeTruthy();
        }, {interval: 500, timeout: 3000});
    })

    test('Multiple navigations are functional', async () => {
        const educationButton = wrapper.getByTestId('education-tab-btn');
        educationButton.click();

        await vi.waitFor(() => {
            expect(wrapper.getByTestId('mocked-educations')).toBeTruthy();
        }, {interval: 500, timeout: 3000});

        const skillsButton = wrapper.getByTestId('skills-tab-btn');
        skillsButton.click();

        await vi.waitFor(() => {
            expect(wrapper.getByTestId('mocked-skills')).toBeTruthy();
        }, {interval: 500, timeout: 3000});

        const experienceButton = wrapper.getByTestId('experience-tab-btn');
        experienceButton.click();

        await vi.waitFor(() => {
            expect(wrapper.getByTestId('mocked-experiences')).toBeTruthy();
        }, {interval: 500, timeout: 3000});
    })
});
