<?php
 /* Настройка контактов в панели настройки->общее */
// Функции вывода нужных полей
  function options_inp_html ( $id ) {
    echo "<input type='text' name='{$id}' value='" . esc_attr( get_option( $id ) ) . "'>";
  }

  add_action( 'admin_init', function() {
    $options = [
      'tel'     =>  'Phone',
      'address' =>  'Address',
      'address_link' =>  'Address link',
      'email'   =>  'E-mail',
      'instagram'  =>  'Instagram',
      'facebook'    =>  'Facebook'
    ];

    foreach ($options as $id => $name) {
      $my_id = "contacts_{$id}";

      add_settings_field( $id, $name, 'options_inp_html', 'general', 'default', $my_id );
      register_setting( 'general', $my_id );
    }
  } );
