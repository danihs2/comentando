
function CommentCard(comment) {
  return (
    <>
        <div className="w-full p-4 bg-gray-100 shadow-lg rounded-xl mb-4">
            <div className="relative flex items-center">
                <img alt="moto" src="/images/object/1.png" className="w-40 h-40 mr-4" />
                <div className="w-full">
                    <p className="mb-2 text-lg font-medium text-gray-800">
                        {comment.nombre}
                    </p>
                    <p className="mb-2 text-sm text-gray-500">
                        {comment.comentario}
                    </p>
                    <button className="text-sm font-medium text-indigo-500">
                        Button
                    </button>
                </div>
            </div>
        </div>
    </>
  );
}

export default CommentCard;