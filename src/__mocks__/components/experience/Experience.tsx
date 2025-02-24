import { vi } from "vitest";

const ExperienceMock = () => {
    vi.mock('./components/experience/Experience', () => ({
        __esModule: true,
        default: () => <div data-testid="mocked-experiences">Mocked Experiences</div>
    }));
}

export default ExperienceMock;