export default function (errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Geçersiz e-posta adresi';
        case 'auth/email-already-in-use':
            return 'Bu e-posta adresi zaten kullanımda';
        case 'auth/user-not-found':
            return 'Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı';
        case 'auth/wrong-password':
            return 'Parola hatalı';
        case 'auth/weak-password':
            return 'Parola en az 6 karakterden oluşmalıdır';
        case 'auth/network-request-failed':
            return 'İnternet bağlantınızı kontrol edin';
            

        default:
            return 'Bir hata oluştu';
    }
}