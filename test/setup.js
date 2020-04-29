import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import axios from "axios"
import httpAdapter from "axios/lib/adapters/http"

configure({ adapter: new Adapter() })

axios.defaults.baseURL = "https://classroom.github.com"
axios.defaults.host = "http://localhost"
axios.defaults.adapter = httpAdapter
