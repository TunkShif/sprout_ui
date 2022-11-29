export default class SproutElement<UIState extends string = "open" | "closed"> extends HTMLElement {
    state: UIState;
    attributeChangedCallback(attribute: string, oldValue: string | undefined | null, newValue: string | undefined | null): void;
    updatedCallback(_attribute: string, _oldValue: string | undefined | null, _newValue: string | undefined | null): void;
    executeJs(command: string | undefined | null): void;
}
