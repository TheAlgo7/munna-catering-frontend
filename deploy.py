import os
import json
import ftplib

# Load FTP config
config_path = 'ftp-config.json'
if not os.path.exists(config_path):
    print("Error: ftp-config.json not found!")
    exit(1)

with open(config_path, 'r') as f:
    config = json.load(f)

print(f"Connecting to {config['host']} via FTP...")
ftp = ftplib.FTP()
ftp.connect(config['host'], config.get('port', 21))
ftp.login(config['username'], config['password'])
print("Connected successfully!")

# InfinityFree projects must be uploaded to /htdocs
try:
    ftp.cwd('htdocs')
    print("Changed directory to 'htdocs'")
except Exception:
    print("Could not cwd to 'htdocs', uploading to root directory.")

def upload_file(local_path, remote_path):
    print(f"Uploading {local_path} -> {remote_path}...")
    with open(local_path, 'rb') as f:
        ftp.storbinary(f'STOR {remote_path}', f)

def ensure_remote_dir(remote_dir):
    parts = remote_dir.split('/')
    current = ""
    for part in parts:
        if not part:
            continue
        current = f"{current}/{part}" if current else part
        try:
            ftp.mkd(current)
            print(f"Created remote directory: {current}")
        except Exception:
            # Directory likely already exists
            pass

# Files and folders to upload
directories_to_upload = ['css', 'html', 'js', 'dist', 'images']
files_to_upload = ['index.html']

# Direct file uploads
for file in files_to_upload:
    if os.path.exists(file):
        upload_file(file, file)

# Directory recursive uploads
for dir_name in directories_to_upload:
    if not os.path.exists(dir_name):
        continue
    for root, dirs, files in os.walk(dir_name):
        # Create corresponding remote directory
        relative_dir = os.path.relpath(root, '.')
        # Replace Windows backslash with forward slash
        remote_dir = relative_dir.replace('\\', '/')
        ensure_remote_dir(remote_dir)
        
        for file in files:
            local_path = os.path.join(root, file)
            relative_file = os.path.relpath(local_path, '.')
            remote_file = relative_file.replace('\\', '/')
            upload_file(local_path, remote_file)

ftp.quit()
print("Deployment completed successfully!")
