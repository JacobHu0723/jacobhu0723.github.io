$urls = array(
    'https://jacobhu0723.github.io/ashcgroup.github.io/',
);
$api = 'http://data.zz.baidu.com/urls?site=https://jacobhu0723.github.io&token=waKCDXfIhd2UW3TB';
$ch = curl_init();
$options =  array(
    CURLOPT_URL => $api,
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS => implode("\n", $urls),
    CURLOPT_HTTPHEADER => array('Content-Type: text/plain'),
);
curl_setopt_array($ch, $options);
$result = curl_exec($ch);
echo $result;
