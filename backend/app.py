"""Process entry point. Run with: python backend/app.py"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from shop import create_app

app = create_app()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
