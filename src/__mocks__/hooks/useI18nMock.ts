import { vi } from "vitest";

const useI18nMock = () => {
    vi.mock('./hooks/useI18n', () => ({
        useI18n: () => ({
            t: (key: string) => key,
            i18n: {},
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            formatDate: (dateString: string, _formatString: string = "MMMM yyyy", _enforceCapitalizeFirstLetter = false) => dateString
        })
    }));
}

export default useI18nMock;