document.getElementById('generateBtn').addEventListener('click', generateCard);
        document.getElementById('downloadBtn').addEventListener('click', downloadCard);

        async function generateCard() {
            const githubUrl = document.getElementById('githubUrl').value.trim();
            if (!githubUrl) {
                alert('Please enter a GitHub profile URL');
                return;
            }

            let username;
            try {
                const url = new URL(githubUrl);
                username = url.pathname.split('/')[1];
            } catch (e) {
                username = githubUrl;
            }

            if (!username) {
                alert('Invalid GitHub URL. Please enter a URL like https://github.com/username');
                return;
            }

            try {
                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                if (!userResponse.ok) throw new Error('User not found');
                const userData = await userResponse.json();

                // Total stars from all repositories
                let totalStars = 0, page = 1;
                const perPage = 100;
                while (true) {
                    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`);
                    if (!reposRes.ok) throw new Error('Unable to fetch repositories');
                    const repos = await reposRes.json();
                    if (!repos.length) break;
                    totalStars += repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
                    page++;
                }

                // Update UI
                document.getElementById('avatar').src = userData.avatar_url;
                document.getElementById('name').textContent = userData.name || username;
                document.getElementById('username').textContent = `@${username}`;
                document.getElementById('bio').textContent = userData.bio || 'No bio available';
                document.getElementById('repos').textContent = userData.public_repos;
                document.getElementById('followers').textContent = userData.followers;
                document.getElementById('following').textContent = userData.following;
                document.getElementById('stars').textContent = totalStars;

                document.getElementById('location').textContent = userData.location ? `📍 ${userData.location}` : '';
                if (userData.blog) {
                    const blogUrl = userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`;
                    document.getElementById('website').innerHTML = `🌐 <a href="${blogUrl}" target="_blank">${blogUrl}</a>`;
                } else {
                    document.getElementById('website').innerHTML = '';
                }

                document.getElementById('twitter').innerHTML = userData.twitter_username
                    ? `<a href="https://twitter.com/${userData.twitter_username}" target="_blank">@${userData.twitter_username}</a>`
                    : '';

                const qrContainer = document.getElementById('qrCode');
                qrContainer.innerHTML = '';
                const qrCodeImg = document.createElement('img');
                qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://github.com/${username}`;
                qrCodeImg.alt = "GitHub Profile QR Code";
                qrContainer.appendChild(qrCodeImg);

                document.getElementById('businessCard').style.display = 'block';
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }

        async function downloadCard() {
            const card = document.getElementById('businessCard');
            if (!card) return;

            try {
                const canvas = await html2canvas(card, { useCORS: true });
                const dataURL = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'github-business-card.png';
                link.click();
            } catch (error) {
                alert('Failed to download card');
            }
        }

        
        document.getElementById('downloadPdfBtn').addEventListener('click', downloadPDF);
        document.getElementById('shareBtn').addEventListener('click', shareCard);

        async function downloadPDF() {
            const { jsPDF } = window.jspdf;
            const card = document.getElementById('businessCard');
            try {
                const canvas = await html2canvas(card, { useCORS: true });
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: [canvas.width, canvas.height],
                });
                pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                pdf.save('github-business-card.pdf');
            } catch (error) {
                alert('Failed to generate PDF');
            }
        }


        async function shareCard() {
            const card = document.getElementById('businessCard');
            const githubUrl = document.getElementById('githubUrl').value.trim();

            // Get displayed user info from card
            const name = document.getElementById('name')?.textContent || '';
            const username = document.getElementById('username')?.textContent || '';
            const bio = document.getElementById('bio')?.textContent || '';

            try {
                const canvas = await html2canvas(card, { useCORS: true });
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                const file = new File([blob], 'github-card.png', { type: 'image/png' });

                const shareText = `👤 ${name} ${username}\n📝 ${bio}\n🔗 GitHub: ${githubUrl}`;

                const shareData = {
                    title: `${name}'s GitHub Card`,
                    text: shareText,
                    files: [file],
                    url: githubUrl
                };

                if (navigator.share && navigator.canShare(shareData)) {
                    await navigator.share(shareData);
                } else {
                    const tempLink = document.createElement('a');
                    tempLink.href = URL.createObjectURL(blob);
                    tempLink.download = 'github-card.png';
                    tempLink.click();
                    alert('Sharing not supported. Card downloaded instead.');
                }
            } catch (error) {
                alert('Unable to share card');
            }
        }

        document.getElementById('toggleDarkMode').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            document.getElementById('businessCard').classList.toggle('dark-mode');
        });

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
            document.getElementById('businessCard').classList.add('dark-mode');
        }
