import { SweetAlertOptions } from 'sweetalert2';

export type LanguageData = Record<string, Record<string, string>>;
export type CallbackOnSuccess = (result: any) => void;
export type CallbackOnError = (error: any) => void;
export type PopupOptions = SwalConfig & {
    title?: string,
    text?: string,
    html?: string | null,
    confirmButtonText?: string,
    denyButtonText?: string,
    beforeConfirm?: (result: any) => void | null,
    callback?: (result: any) => void | null,
    showLoading?: boolean
}
export type SwalConfig = SweetAlertOptions & {
    template?: string,
    reverseButtons?: boolean,
    confirmButtonColor?: string,
    focusConfirm?: boolean
}
