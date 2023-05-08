import libs from './libs.js';
const { express, helmet, bodyParser, cors, morgan, fileURLToPath, path, dotenv } = libs;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( { policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' https://cdn.socket.io/4.1.2/socket.io.min.js");
    next();
});
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' https://cdn.socket.io/4.1.2/socket.io.min.js 'unsafe-inline'");
    next();
});

app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
app.use('/client', express.static(path.join(__dirname, '../../client')));
app.get('/', (req, res) => {
    res.redirect('/client/index.html');
});
export { app };
