export const errorProcessing = (res, error, status, message) => {
    console.log(error)
    return res.status(Number(status)).json({ message })
}