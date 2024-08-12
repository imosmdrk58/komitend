import SerieForm from "@/components/admin/forms/SerieForm"
import { getSerie } from "@/services/serieService"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const EditSeries = () => {
  const { slug } = useParams()

  const { data, isPending } = useQuery({
    queryKey: ["series", { slug }],
    queryFn: async () => await getSerie(slug!),
  })

  if (isPending) return null

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
        <SerieForm data={data} />
    </main>
  )
}

export default EditSeries