import { useSearchParams } from "react-router-dom"
import Button from "./button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className="flex mx-auto gap-2">
        {Number(searchParams.get("page") || 1) > 1 && (
            <Button className="flex gap-2 items-center justify-center" onClick={() => {
                searchParams.set("page", (Number(searchParams.get("page") || 1) - 1).toString())
                setSearchParams(searchParams)
            }}>
                <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                Previous
            </Button>
        )}
        {Number(searchParams.get("page") || 1) < totalPages && (
            <Button className="flex gap-2 items-center justify-center" onClick={() => {
                searchParams.set("page", (Number(searchParams.get("page") || 1) + 1).toString())
                setSearchParams(searchParams)
            }}>
                Next
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </Button>
        )}
    </div>
  )
}

export default Pagination