# Sortify AI - Waste Classification Platform

## Overview
Sortify AI is a web-based platform that helps users classify waste materials using artificial intelligence. The platform aims to promote proper waste management and recycling practices through technology.

## Features
- 🤖 AI-powered waste classification
- 📸 Real-time camera capture and image upload
- 📊 Classification statistics and history
- 📱 Responsive design for mobile and desktop
- 🔐 Secure user authentication
- 📚 Educational content about waste management

## Tech Stack
- React.js
- Tailwind CSS
- DaisyUI
- React Router
- Lucide Icons

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository
```bash
git clone [your-repository-url]
cd dicoding-sortify-react-frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## Project Structure
```
src/
├── components/     # Reusable components
├── page/          # Page components
├── utils/         # Utility functions and API calls
└── assets/        # Static assets
```

## Environment Variables
Create a `.env` file in the root directory:
```
VITE_API_URL=your_backend_api_url
```

## Authentication
The platform uses JWT-based authentication. Tokens are stored in localStorage and automatically included in API requests.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
