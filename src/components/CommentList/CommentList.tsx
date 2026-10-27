import type { Story } from '../../types/story'
import './CommentList.css'

type CommentListProps = {
  comments: Story[]
}

/**
 * Lista de comentarios de una historia.
 */
function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <section className="comment-list" aria-label="Comentarios">
        <p className="comment-list__empty">No hay comentarios para mostrar.</p>
      </section>
    )
  }

  return (
    <section className="comment-list" aria-label="Comentarios">
      <h2 className="comment-list__title">
        Comentarios ({comments.length})
      </h2>

      <ul className="comment-list__items">
        {comments.map((comment) => {
          const date = new Date(comment.time * 1000).toLocaleString()

          return (
            <li key={comment.id} className="comment-list__item">
              <article className="comment">
                <p className="comment__meta">
                  <span className="comment__author">{comment.by}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{date}</span>
                </p>
                {comment.text ? (
                  <div
                    className="comment__text"
                    dangerouslySetInnerHTML={{ __html: comment.text }}
                  />
                ) : (
                  <p className="comment__deleted">Comentario sin contenido.</p>
                )}
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CommentList