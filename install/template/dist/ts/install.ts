import Utils from '@carry0987/utils-full';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { LanguageData, CallbackOnSuccess, CallbackOnError, SwalConfig, PopupOptions } from './type/types';


// Check library usable
if (!Utils) throw new Error('Utils not found');
if (!$) throw new Error('jQuery not found');

class InstallHelper {
    private inputActions: Record<string, any> = {};
    private static backURL: string = '../public/';

    public init(): void {
        this.checkInstalled();
        this.initValidation();
    }

    private showMsg = (isValid: boolean, msg: string, target: string = '#display'): void => {
        const textWarn: string = `<span style='color: red'>`;
        const textNorm: string = `<span style='color: green'>`;
        const message: string = (isValid ? textNorm : textWarn) + msg + `</span>`;
        $(target).html(message);
    }

    private checkInput = ($element: JQuery, value: string): boolean => {
        const element = $element.val()?.toString().trim();

        if (!element) {
            this.showMsg(false, value);
            return false;
        }
        this.showMsg(true, '');

        return true;
    }

    private checkPasswordLength = ($element: JQuery, value: string): boolean => {
        const password = $element.val()?.toString().trim();

        if (!password || password.length < 8) {
            this.showMsg(false, value);
            return false;
        }
        this.showMsg(true, '');

        return true;
    }

    private checkPasswordConfirmation = ($password: JQuery, $confirmPassword: JQuery, message: string): boolean => {
        if ($password.val() !== $confirmPassword.val()) {
            this.showMsg(false, message);
            return false;
        }
        this.showMsg(true, '');

        return true;
    }

    private validateInputs = (): void => {
        const $inputs: JQuery = $('#install input').not('[type="submit"]');
        const isDisplayEmpty: boolean = $('#display > span').is(':empty');
        const isEmpty: boolean = $inputs.toArray().some(input => { 
            return !(input as HTMLInputElement).value.trim().length; 
        });

        $inputs.each((index, element) => {
            const $input: JQuery = $(element);
            if (!(element as HTMLInputElement).value.trim().length) {
                $input.addClass('bg-danger-subtle');
            } else {
                $input.removeClass('bg-danger-subtle');
            }
        });

        $('#submit').prop('disabled', isEmpty || !isDisplayEmpty);
    }

    private async sendFormData(url: string, data: Record<string, any>, method = 'POST', success: CallbackOnSuccess, errorCallback: CallbackOnError): Promise<boolean> {
        return Utils.sendFormData({
            url: url,
            method: method,
            data: data,
            success: success,
            error: errorCallback
        });
    }

    private fetchData = (data: any, resolveData: (response: any) => any, method: string = 'POST', parameter: string | null = null): Promise<any> => {
        let url = 'api.php';
        if (parameter) {
            url += '?' + parameter;
        }

        return new Promise((resolve, reject) => {
            Utils.doFetch({
                url: url,
                method: method,
                body: Utils.encodeFormData(data),
                success: function (res: any) {
                    resolve(resolveData(res));
                },
                error: function (error: any) {
                    reject(error);
                }
            });
        });
    }

    private async showSwal(popupOptions: PopupOptions): Promise<SweetAlertResult> {
        const { title, text, html, beforeConfirm, callback, showLoading } = popupOptions;
        // Remove callback from popupOptions
        delete popupOptions.callback;
        // Build SwalConfig
        let swal_config: SwalConfig = {
            title: title?.toString() ?? '',
            text: text?.toString() ?? '',
            html: html ?? undefined,
            focusConfirm: false,
            showCancelButton: false,
            showCloseButton: false,
            showDenyButton: false,
            showConfirmButton: false,
            allowOutsideClick: !showLoading,
            allowEscapeKey: !showLoading
        };
        swal_config = Utils.deepMerge({} as SwalConfig, swal_config, popupOptions);
        if (showLoading && !swal_config.didOpen) {
            swal_config.didOpen = () => {
                Swal.showLoading();
            }
        }
        const popResult = await Swal.fire(swal_config).then((result) => {
            if (beforeConfirm) beforeConfirm(result);
            if (result.isConfirmed || result.isDismissed) {
                if (callback) callback(result);
            }
            return result;
        });

        return popResult;
    }

    // Get language list
    private async langList(): Promise<LanguageData> {
        return this.fetchData({ request: 'get_language' }, data => data['lang']);
    }

    private async checkInstalled(): Promise<void> {
        const formData = new FormData();
        const lang = await this.langList();

        await this.sendFormData('api.php', { request: 'check_installed', data: formData }, 'POST', async (res: boolean) => {
            Swal.hideLoading();
            if (res === true) {
                $('#install, #form-title').hide();
                await this.showSwal({
                    icon: 'error',
                    text: lang['install']['installed'],
                    showConfirmButton: true
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        window.location.href = InstallHelper.backURL;
                    }
                });
            }
        }, async (error: any) => {
            await this.showSwal({title: 'Error', text: error, icon: 'error'});
        });
    }

    private buildInputActions(): void {
        this.inputActions = {
            'admin': {
                method: this.checkInput,
                messageKey: 'username_empty'
            },
            'admin_psw': {
                method: this.checkPasswordLength,
                messageKey: 'password_rule'
            },
            'admin_psw_confirm': {
                method: this.checkPasswordConfirmation,
                messageKey: 'repassword_error'
            }
        };
    }

    private async initValidation(): Promise<void> {
        // Lang
        const lang = await this.langList();

        // Input actions
        this.buildInputActions();

        // Input event
        $('#install').on('input blur propertychange', 'input', (e) => {
            const id = e.target.id;
            const action = this.inputActions[id];
            if (action && typeof action.method === 'function') {
                const index = action.messageIdx ? action.messageIdx : 'install';
                if (id === 'admin_psw_confirm') {
                    action.method($('#admin_psw'), $(e.target), lang[index][action.messageKey]);
                } else {
                    action.method($(e.target), lang[index][action.messageKey]);
                }
            }
        });

        // Check input before submit
        $('#install').on('input', 'input', (event) => {
            const $input = $(event.target);
            $input.removeClass('bg-danger-subtle');
        });

        $('#install').on('input blur', 'input', () => {
            this.validateInputs();
        });

        $('#install').on('submit', async (event) => {
            event.preventDefault();
            this.validateInputs();
            const isUsernameValid = this.checkInput($('#admin'), lang['install']['username_empty']);
            const isPasswordValid = this.checkInput($('#admin_psw'), lang['install']['password_rule']);
            const isPasswordConfirmValid = this.checkPasswordConfirmation($('#admin_psw'), $('#admin_psw_confirm'), lang['install']['repassword_error']);
            if (!isUsernameValid || !isPasswordValid || !isPasswordConfirmValid) {
                return false;
            }
            if (!$(event.target).find('#submit').prop('disabled')) {
                const formData = new FormData(event.target as HTMLFormElement);
                const formObject: Record<string, any> = {};
                for (let [key, value] of formData.entries()) {
                    formObject[key] = value;
                }
                await this.showSwal({
                    text: lang['install']['installing'],
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    willOpen: () => {
                        $('#install, #form-title').hide();
                    },
                    didOpen: () => {
                        this.showSwal({
                            text: lang['install']['installing'],
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            willOpen: async () => {
                                $('#install, #form-title').hide();
                                formObject['request'] = 'start_install';
                                await this.sendFormData('api.php', formObject, 'POST', function(res) {
                                    Swal.hideLoading();
                                    if (res['status'] === true) {
                                        Swal.fire({
                                            icon: 'success',
                                            html: lang['install']['install_success']+'<br>'+lang['install']['install_remove'],
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                window.location.href = InstallHelper.backURL;
                                            }
                                        });
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            html: res['message']
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                window.location.reload();
                                            }
                                        });
                                    }
                                }, async (error: any) => {
                                    await this.showSwal({title: 'Error', html: error, icon: 'error'});
                                });
                            }
                        });
                    },
                    didClose: () => {
                        $('#install, #form-title').show();
                    }
                });
            }
        });
    }
}

export default InstallHelper;
