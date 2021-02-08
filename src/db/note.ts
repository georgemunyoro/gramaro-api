export default function makeDatabase({ getDatabaseConnection }) {
    return Object.freeze({
        findById,
        findByUuid,
        create,
        update,
        delete,
    })
}
