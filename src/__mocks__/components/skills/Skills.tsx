import { vi } from "vitest";

const SkillsMock = () => {
    vi.mock("./components/skills/Skills", () => ({
        __esModule: true,
        default: () => <div data-testid="mocked-skills">Mocked Skills</div>,
    }));
}

export default SkillsMock;