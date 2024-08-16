import ChapterForm from "@/components/admin/forms/ChapterForm"
import { getChapter } from "@/services/chapterService"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const EditChapter = () => {
  const { slug } = useParams()

  const { data, isPending } = useQuery({
    queryKey: ["chapters", { slug }],
    queryFn: async () => await getChapter(slug!),
  })

  if (isPending) return null

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
        <ChapterForm data={data} />
    </main>
  )
}

export default EditChapter