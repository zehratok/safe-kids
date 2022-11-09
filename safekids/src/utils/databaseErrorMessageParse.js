export default function (errorCode) {
    switch (errorCode) {
        case 'database/invalid-argument':
            return 'Geçersiz bir değer girdiniz.';
        case 'database/permission-denied':
            return 'Yetkiniz yok.';
        case 'database/unknown':
            return 'Bilinmeyen bir hata oluştu.';
        case 'database/unavailable':
            return 'Veritabanı şu anda kullanılamıyor.';
        case 'database/data-stale':
            return 'Verileriniz güncel değil.';
        case 'database/canceled':
            return 'İşlem iptal edildi.';

        default:
            return 'Bilinmeyen bir hata oluştu.';

    }
}