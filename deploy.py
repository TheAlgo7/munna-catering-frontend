import os
import json
import ftplib
import time

# Load FTP config
config_path = 'ftp-config.json'
if not os.path.exists(config_path):
    print("Error: ftp-config.json not found!")
    exit(1)

with open(config_path, 'r') as f:
    config = json.load(f)

def get_ftp_connection():
    print(f"Connecting to {config['host']} via FTP...")
    ftp = ftplib.FTP()
    ftp.connect(config['host'], config.get('port', 21), timeout=60)
    ftp.login(config['username'], config['password'])
    ftp.set_pasv(True)
    # InfinityFree projects must be uploaded to /htdocs
    try:
        ftp.cwd('htdocs')
    except Exception:
        pass
    return ftp

ftp = get_ftp_connection()
print("Connected successfully!")

def upload_file_with_retry(local_path, remote_path, retries=3):
    global ftp
    for attempt in range(retries):
        try:
            print(f"Uploading {local_path} -> {remote_path} (Attempt {attempt+1}/{retries})...")
            with open(local_path, 'rb') as f:
                ftp.storbinary(f'STOR {remote_path}', f)
            print("Upload successful!")
            return True
        except Exception as e:
            print(f"Upload failed: {e}")
            if attempt < retries - 1:
                print("Waiting 3 seconds to reconnect and retry...")
                time.sleep(3)
                try:
                    ftp.quit()
                except Exception:
                    pass
                try:
                    ftp = get_ftp_connection()
                except Exception as rc_err:
                    print(f"Reconnection failed: {rc_err}")
            else:
                raise e

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

try:
    # Direct file uploads
    for file in files_to_upload:
        if os.path.exists(file):
            upload_file_with_retry(file, file)

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
                upload_file_with_retry(local_path, remote_file)
finally:
    try:
        ftp.quit()
    except Exception:
        pass

print("Deployment completed successfully!")
