export const emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegex = /^.{6,}$/;
export const nameRegex = /^[A-Z]{1}[A-Za-z0-9_ ]{1,}$/;
export const optionRegex = /^[^0]+$/;

export async function validate(value, regex, message) {
    if (value === '' || value === null || String(() => value.trim()) === '') {
        return await 'This field is requried';
    } else {
        if (await regex.test(value)) {
            return await null;
        } else {
            return await message;
        }
    }
}
