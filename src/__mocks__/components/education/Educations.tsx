import { vi } from "vitest";

const EducationsMock = () => {
    vi.mock('./components/education/Educations', () => ({
        __esModule: true,
        default: () => <div data-testid="mocked-educations">Mocked Educations</div>
    }));
}

export default EducationsMock;