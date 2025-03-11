import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import { Suspense } from 'react';
import Educations from './Educations';

vi.mock('@hooks/useI18n', () => ({
    useI18n: () => ({
        t: (key: string) => key,
        i18n: {},
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formatDate: (dateString: string, _formatString: string = "MMMM yyyy", _enforceCapitalizeFirstLetter = false) => dateString
    })
}));

vi.mock('@hooks/useTheme', () => ({
    mode: 'light',
}));

describe('Educations - mobile', { }, () => {
    let wrapper: RenderResult;
    beforeEach(async () => {
        wrapper = render(
            <Suspense fallback={<div>Loading...</div>}>
                <Educations />
            </Suspense>
        );

        await new Promise((r) => setTimeout(r, 1000));
    });

    afterEach(() => {
        wrapper?.unmount();
    });

    
    test('Mounts properly', async () => {
        expect(wrapper.container).toBeTruthy();
    });
}
);