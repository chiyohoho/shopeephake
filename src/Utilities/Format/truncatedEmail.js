export const truncatedEmail = (userData) => {
    const email = userData?.email
    const truncatedText = email?.length > 20 ? email.substring(0, 20) + "..." : email

    return truncatedText
}