export default function getAvatar(userData) {
    const baseAvatarUrl = 'https://api-ecom.duthanhduoc.com/images/'
    const defaultAvatarUrl = 'https://i.pinimg.com/474x/94/cb/68/94cb68baea50bb98cdab65b74e731c1c.jpg'

    const avatar = {
        userAvatar: userData ? `${baseAvatarUrl}${userData.avatar}` : defaultAvatarUrl,
        defaultAvatar: defaultAvatarUrl
    }

    return avatar
}