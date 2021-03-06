import { TableRow, TableCell } from '@material-ui/core'
import { isExpired } from '../services/memeService'

export default function Meme({ meme_id, username, createdAt, expiredAt, description, likes, imageUrl }) {
    const date = new Date(createdAt), formatedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

    return (
        <TableRow>
            <TableCell>{username}</TableCell>
            <TableCell>{formatedDate}</TableCell>
            {isExpired(expiredAt) ? <TableCell><i>Message vanished</i></TableCell> :
                <>
                    <TableCell>{description}</TableCell>
                    <TableCell>{imageUrl && <img src={imageUrl} alt={meme_id} height="100" />}</TableCell>
                    <TableCell>{likes}</TableCell>
                </>}
        </TableRow>
    )
}