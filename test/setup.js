import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import axios from "axios"
import httpAdapter from "axios/lib/adapters/http"

configure({ adapter: new Adapter() })

const host = "http://localhost"

axios.defaults.host = host
axios.defaults.adapter = httpAdapter
